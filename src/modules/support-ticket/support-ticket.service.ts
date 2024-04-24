import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { omitDtoSchema } from 'src/shared';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class SupportTicketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createSupportTicketDto: CreateSupportTicketDto,
    images: Express.Multer.File[] | undefined,
  ) {
    const omittedDto = omitDtoSchema(createSupportTicketDto);

    const uploadPromises = images?.map(async (file) => {
      const publicId = await this.cloudinaryService.uploadFile(
        file,
        'support-tickets',
      );
      return { imageURL: publicId };
    });

    const uploadedImages = await Promise.all(uploadPromises ?? []);

    return await this.prisma.supportTicket.create({
      data: { ...omittedDto, images: { createMany: { data: uploadedImages } } },
      include: { images: true },
    });
  }

  async findAll() {
    return await this.prisma.supportTicket.findMany({
      include: { images: true },
    });
  }

  async findAllStoreTickets(storeId: number) {
    return await this.prisma.supportTicket.findMany({
      where: { storeId },
      include: { images: true },
    });
  }

  async findOne(supportTicketId: number) {
    return await this.prisma.supportTicket.findUniqueOrThrow({
      where: { id: supportTicketId },
      include: { images: true },
    });
  }

  async remove(supportTicketId: number) {
    await this.prisma.supportTicket.delete({
      where: { id: supportTicketId },
    });
  }
}
