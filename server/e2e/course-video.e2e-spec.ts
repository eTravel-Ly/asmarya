import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CourseVideoDTO } from '../src/service/dto/course-video.dto';
import { CourseVideoService } from '../src/service/course-video.service';

describe('CourseVideo Controller', () => {
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
      .overrideProvider(CourseVideoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all course-videos ', async () => {
    const getEntities: CourseVideoDTO[] = (await request(app.getHttpServer()).get('/api/course-videos').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET course-videos by id', async () => {
    const getEntity: CourseVideoDTO = (
      await request(app.getHttpServer())
        .get('/api/course-videos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create course-videos', async () => {
    const createdEntity: CourseVideoDTO = (await request(app.getHttpServer()).post('/api/course-videos').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update course-videos', async () => {
    const updatedEntity: CourseVideoDTO = (await request(app.getHttpServer()).put('/api/course-videos').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update course-videos from id', async () => {
    const updatedEntity: CourseVideoDTO = (
      await request(app.getHttpServer())
        .put('/api/course-videos/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE course-videos', async () => {
    const deletedEntity: CourseVideoDTO = (
      await request(app.getHttpServer())
        .delete('/api/course-videos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
