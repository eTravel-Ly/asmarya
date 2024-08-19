import { ApiProperty } from '@nestjs/swagger';

export class BookBorrowRequestVM {
  @ApiProperty({ description: 'ID of the book to borrow' })
  bookId: number;

  @ApiProperty({ description: 'Date to collect the book', required: true })
  collectDate: Date;

  @ApiProperty({ description: 'Date to return the book', required: true })
  returnDate: Date;
}
