import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useGeneralStore } from "@/stores/generalStore";
import { useRouter } from "next/navigation";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUserStore((state) => state);

  useEffect(() => {
    if (!user.id) {
      router.push("/login");
    }
  }, [user.id, router]);

  if (!user.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        Sign in or create an account to continue.
      </div>
    );
  }

  return <>{children}</>;
}
