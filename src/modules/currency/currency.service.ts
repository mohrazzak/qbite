import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { PrismaService } from '../prisma/prisma.service';
import { omitDtoSchema } from 'src/shared';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const omittedDto = omitDtoSchema(createCurrencyDto);

    return await this.prisma.currency.create({
      data: { ...omittedDto },
    });
  }

  async findAll() {
    return await this.prisma.currency.findMany();
  }

  async findOne(currencyId: number) {
    return await this.prisma.currency.findUniqueOrThrow({
      where: { id: currencyId },
    });
  }

  async update(currencyId: number, updateCurrencyDto: UpdateCurrencyDto) {
    const omittedDto = omitDtoSchema(updateCurrencyDto);

    return await this.prisma.currency.update({
      where: { id: currencyId },
      data: { ...omittedDto },
    });
  }

  async remove(currencyId: number) {
    await this.prisma.currency.delete({
      where: { id: currencyId },
    });
  }
}
