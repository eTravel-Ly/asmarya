import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { LearnerDTO } from '../src/service/dto/learner.dto';
import { LearnerService } from '../src/service/learner.service';

describe('Learner Controller', () => {
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
      .overrideProvider(LearnerService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all learners ', async () => {
    const getEntities: LearnerDTO[] = (await request(app.getHttpServer()).get('/api/learners').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET learners by id', async () => {
    const getEntity: LearnerDTO = (
      await request(app.getHttpServer())
        .get('/api/learners/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create learners', async () => {
    const createdEntity: LearnerDTO = (await request(app.getHttpServer()).post('/api/learners').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update learners', async () => {
    const updatedEntity: LearnerDTO = (await request(app.getHttpServer()).put('/api/learners').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update learners from id', async () => {
    const updatedEntity: LearnerDTO = (
      await request(app.getHttpServer())
        .put('/api/learners/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE learners', async () => {
    const deletedEntity: LearnerDTO = (
      await request(app.getHttpServer())
        .delete('/api/learners/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
