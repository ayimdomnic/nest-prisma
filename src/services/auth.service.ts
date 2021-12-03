import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { LoginInput, RegisterInput, Token } from 'src/dtos/auth.dto';
import { SecurityConfig } from 'src/types';
import { Prisma, User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(input: RegisterInput) {
    if (input.password !== input.passwordConfirm)
      throw new Error('Passwords do not match');
    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );
    const user =  await this.prisma.user.create({
      data: {
        fullname: input.fullName,
        email: input.email,
        password: hashedPassword,
      },
    });

    return this.generateToken({
        userId: user.id,
    })
  }

  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) throw new Error('User not found');
    const isPasswordValid = await this.passwordService.validatePassword(
      input.password,
      user.password,
    );
    if (!isPasswordValid) throw new Error('Invalid password');

    return this.generateToken({
      userId: user.id,
    });
  }
  private generateToken(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshExpiresIn,
    });
  }
  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateToken({ userId });
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }


  async validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
