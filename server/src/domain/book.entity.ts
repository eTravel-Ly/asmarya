/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Category } from './category.entity';
import { BookGenre } from './enumeration/book-genre';
import { Language } from './enumeration/language';
import { BookAvailability } from './enumeration/book-availability';
import { Comment } from './comment.entity';

/**
 * A Book.
 */
@Entity('book')
export class Book extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ type: 'date', name: 'publication_date', nullable: true })
  publicationDate: any;

  @Column({ name: 'isbn', nullable: true })
  isbn: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'simple-enum', name: 'genre', enum: BookGenre })
  genre: BookGenre;

  @Column({ name: 'publisher', nullable: true })
  publisher: string;

  @Column({ type: 'integer', name: 'page_count', nullable: true })
  pageCount: number;

  @Column({ type: 'simple-enum', name: 'language', enum: Language })
  language: Language;

  @Column({ type: 'longblob', name: 'cover_image_file', nullable: true })
  coverImageFile: any;

  @Column({ name: 'cover_image_file_content_type', nullable: true })
  coverImageFileContentType: string;
  @Column({ name: 'cover_image_url', nullable: true })
  coverImageUrl: string;

  @Column({ type: 'longblob', name: 'book_file', nullable: true })
  bookFile: any;

  @Column({ name: 'book_file_content_type', nullable: true })
  bookFileContentType: string;
  @Column({ name: 'book_url', nullable: true })
  bookUrl: string;

  @Column({ type: 'float', name: 'price', nullable: true })
  price: number;

  @Column({ type: 'float', name: 'students_price', nullable: true })
  studentsPrice: number;

  @Column({ type: 'integer', name: 'number_of_books_available', nullable: true })
  numberOfBooksAvailable: number;

  @Column({ name: 'keywords', nullable: true })
  keywords: string;

  @Column({ type: 'simple-enum', name: 'book_availability', enum: BookAvailability })
  bookAvailability: BookAvailability;

  @ManyToMany(type => Category)
  @JoinTable({
    name: 'rel_book__categories',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categories_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @OneToMany(type => Comment, comment => comment.book)
  comments: Comment[];

  overallRating: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
