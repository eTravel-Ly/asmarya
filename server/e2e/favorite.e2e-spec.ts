import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { FavoriteDTO } from '../src/service/dto/favorite.dto';
import { FavoriteService } from '../src/service/favorite.service';

describe('Favorite Controller', () => {
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
      .overrideProvider(FavoriteService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all favorites ', async () => {
    const getEntities: FavoriteDTO[] = (await request(app.getHttpServer()).get('/api/favorites').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET favorites by id', async () => {
    const getEntity: FavoriteDTO = (
      await request(app.getHttpServer())
        .get('/api/favorites/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create favorites', async () => {
    const createdEntity: FavoriteDTO = (await request(app.getHttpServer()).post('/api/favorites').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update favorites', async () => {
    const updatedEntity: FavoriteDTO = (await request(app.getHttpServer()).put('/api/favorites').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update favorites from id', async () => {
    const updatedEntity: FavoriteDTO = (
      await request(app.getHttpServer())
        .put('/api/favorites/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE favorites', async () => {
    const deletedEntity: FavoriteDTO = (
      await request(app.getHttpServer())
        .delete('/api/favorites/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
