import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { SendRequestInput } from 'src/dtos/request.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async requests(user: User) {
    const requests = await this.prisma.request.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return requests;
  }

  async sendRequest(user: User, input: SendRequestInput) {
    const recipient = await this.prisma.user.findUnique({
      where: {
        id: input.userId,
      },
    });

    const request = await this.prisma.request.create({
      data: {
        userId: recipient.id,
        requesterId: user.id,
        status: 'PENDING',
      },
    });

    return request;
  }

  async acceptRequest(user: User, requestId: string, status: string) {
    const request = await this.prisma.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (request.requesterId !== user.id) {
      throw new Error('You are not the requester');
    }

    const updatedRequest = await this.prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status,
      },
    });

    return updatedRequest;
  }
}
