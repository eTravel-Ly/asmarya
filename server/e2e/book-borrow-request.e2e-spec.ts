import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { BookBorrowRequestDTO } from '../src/service/dto/book-borrow-request.dto';
import { BookBorrowRequestService } from '../src/service/book-borrow-request.service';

describe('BookBorrowRequest Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(BookBorrowRequestService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all book-borrow-requests ', async () => {
    const getEntities: BookBorrowRequestDTO[] = (await request(app.getHttpServer()).get('/api/book-borrow-requests').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET book-borrow-requests by id', async () => {
    const getEntity: BookBorrowRequestDTO = (
      await request(app.getHttpServer())
        .get('/api/book-borrow-requests/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create book-borrow-requests', async () => {
    const createdEntity: BookBorrowRequestDTO = (
      await request(app.getHttpServer()).post('/api/book-borrow-requests').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update book-borrow-requests', async () => {
    const updatedEntity: BookBorrowRequestDTO = (
      await request(app.getHttpServer()).put('/api/book-borrow-requests').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update book-borrow-requests from id', async () => {
    const updatedEntity: BookBorrowRequestDTO = (
      await request(app.getHttpServer())
        .put('/api/book-borrow-requests/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE book-borrow-requests', async () => {
    const deletedEntity: BookBorrowRequestDTO = (
      await request(app.getHttpServer())
        .delete('/api/book-borrow-requests/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
