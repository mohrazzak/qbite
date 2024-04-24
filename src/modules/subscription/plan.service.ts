import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  getLatestSubscriptionsVersion() {
    return this.prisma.plan.findMany({
      include: {
        versions: {
          orderBy: {
            version: 'desc',
          },
          take: 1,
        },
      },
    });
  }
}
