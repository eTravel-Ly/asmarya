import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CenterDTO } from '../src/service/dto/center.dto';
import { CenterService } from '../src/service/center.service';

describe('Center Controller', () => {
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
      .overrideProvider(CenterService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all centers ', async () => {
    const getEntities: CenterDTO[] = (await request(app.getHttpServer()).get('/api/centers').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET centers by id', async () => {
    const getEntity: CenterDTO = (
      await request(app.getHttpServer())
        .get('/api/centers/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create centers', async () => {
    const createdEntity: CenterDTO = (await request(app.getHttpServer()).post('/api/centers').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update centers', async () => {
    const updatedEntity: CenterDTO = (await request(app.getHttpServer()).put('/api/centers').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update centers from id', async () => {
    const updatedEntity: CenterDTO = (
      await request(app.getHttpServer())
        .put('/api/centers/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE centers', async () => {
    const deletedEntity: CenterDTO = (
      await request(app.getHttpServer())
        .delete('/api/centers/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
