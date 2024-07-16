import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Book } from '../domain/book.entity';
import { BookGenre } from '../domain/enumeration/book-genre';
import { Language } from '../domain/enumeration/language';
import { BookAvailability } from '../domain/enumeration/book-availability';

export class SeedData1570200490073 implements MigrationInterface {
  book1: Book = {
    id: 1,
    title: 'Book1',
    author: 'Author1',
    isbn: '1234567891234',
    genre: BookGenre.BIOGRAPHY,
    publisher: 'Publisher1',
    pageCount: 100,
    description: 'Description of Book1',
    language: Language.ARABIC,
    coverImageUrl: '',
    bookUrl: '',
    publicationDate: new Date(),
    price: 10,
    studentsPrice: 5,
    numberOfBooksAvailable: 10,
    keywords: 'keyword1, keyword2',
    bookAvailability: BookAvailability.UNAVAILABLE,
    createdBy: 'system',
    lastModifiedBy: 'system',
    coverImageFile: null,
    coverImageFileContentType: null,
    bookFile: null,
    bookFileContentType: null,
    categories: [],
  };

  // eslint-disable-next-line
  public async up(queryRunner: QueryRunner): Promise<any> {
    const bookRepository = getRepository('book');
    await bookRepository.save([this.book1]);
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
