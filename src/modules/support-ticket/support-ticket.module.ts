import { Module } from '@nestjs/common';
import { SupportTicketService } from './support-ticket.service';
import { SupportTicketController } from './support-ticket.controller';
import { cloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [cloudinaryModule],
  controllers: [SupportTicketController],
  providers: [SupportTicketService],
})
export class SupportTicketModule {}
