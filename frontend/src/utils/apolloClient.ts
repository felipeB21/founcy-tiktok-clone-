import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { onError } from "@apollo/client/link/error";

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          accessToken
        }
      `,
    });

    const newAccessToken = data?.accessToken;

    if (!newAccessToken) {
      throw new Error("No access token");
    }
    localStorage.setItem("accessToken", newAccessToken);
    return `Bearer ${newAccessToken}`;
  } catch (error) {
    throw new Error("No access token");
  }
}

let retryCount = 0;
const maxRetries = 3;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (
        err.extensions &&
        err.extensions.code === "UNAUTHENTICATED" &&
        retryCount < maxRetries
      ) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken(client)
            .then((token) => {
              operation.setContext(({ headers: { ...headers } }) => ({
                headers: {
                  ...headers,
                  authorization: token,
                },
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => {
              observer.error(error);
            });
        });
      }
    }
  }
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCommentsByPostId: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  link: ApolloLink.from([errorLink, uploadLink]),
});
