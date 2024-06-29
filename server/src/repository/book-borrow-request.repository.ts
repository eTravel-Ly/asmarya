import { EntityRepository, Repository } from 'typeorm';
import { BookBorrowRequest } from '../domain/book-borrow-request.entity';

@EntityRepository(BookBorrowRequest)
export class BookBorrowRequestRepository extends Repository<BookBorrowRequest> {}
