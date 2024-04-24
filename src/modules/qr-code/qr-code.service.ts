import { Injectable } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { omitDtoSchema } from 'src/shared';

@Injectable()
export class QrCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQrCodeDto: CreateQrCodeDto, storeId: number) {
    const omittedDto = omitDtoSchema(createQrCodeDto);

    return await this.prisma.qrCode.create({
      data: { ...omittedDto, storeId },
      include: { store: { select: { logoURL: true } } },
    });
  }

  async findOneByStoreId(storeId: number) {
    return await this.prisma.qrCode.findUniqueOrThrow({
      where: { storeId },
      include: { store: { select: { logoURL: true } } },
    });
  }

  async update(qrCodeId: number, updateQrCodeDto: UpdateQrCodeDto) {
    const omittedDto = omitDtoSchema(updateQrCodeDto);

    return await this.prisma.qrCode.update({
      data: { ...omittedDto },
      where: { id: qrCodeId },
      include: { store: { select: { logoURL: true } } },
    });
  }

  async remove(qrCodeId: number) {
    await this.prisma.qrCode.delete({
      where: { id: qrCodeId },
    });
  }
}
