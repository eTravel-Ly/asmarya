import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { EventDTO } from '../src/service/dto/event.dto';
import { EventService } from '../src/service/event.service';

describe('Event Controller', () => {
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
      .overrideProvider(EventService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all events ', async () => {
    const getEntities: EventDTO[] = (await request(app.getHttpServer()).get('/api/events').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET events by id', async () => {
    const getEntity: EventDTO = (
      await request(app.getHttpServer())
        .get('/api/events/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create events', async () => {
    const createdEntity: EventDTO = (await request(app.getHttpServer()).post('/api/events').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update events', async () => {
    const updatedEntity: EventDTO = (await request(app.getHttpServer()).put('/api/events').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update events from id', async () => {
    const updatedEntity: EventDTO = (
      await request(app.getHttpServer())
        .put('/api/events/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE events', async () => {
    const deletedEntity: EventDTO = (
      await request(app.getHttpServer())
        .delete('/api/events/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
