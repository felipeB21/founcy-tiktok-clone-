import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async refreshToken(req: Request, res: Response): Promise<string> {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new BadRequestException('Refresh token not found');
    }

    let payload;
    try {
      payload = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!userExists) {
      throw new UnauthorizedException('User not found');
    }

    const expiresIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;
    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );

    res.cookie('access_token', accessToken, { httpOnly: true });

    return accessToken;
  }

  private async issueTokens(user: User, response: Response) {
    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '150sec',
      },
    );

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    return { user };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  async register(registerDto: RegisterDto, response: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        username: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    return this.issueTokens(user, response);
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueTokens(user, response);
  }

  async logout(response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return 'Logged out successfully';
  }
}
