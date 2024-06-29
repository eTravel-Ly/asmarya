import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBorrowRequestController } from '../web/rest/book-borrow-request.controller';
import { BookBorrowRequestRepository } from '../repository/book-borrow-request.repository';
import { BookBorrowRequestService } from '../service/book-borrow-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookBorrowRequestRepository])],
  controllers: [BookBorrowRequestController],
  providers: [BookBorrowRequestService],
  exports: [BookBorrowRequestService],
})
export class BookBorrowRequestModule {}
