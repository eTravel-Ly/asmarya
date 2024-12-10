import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { EventSubscriptionDTO } from '../src/service/dto/event-subscription.dto';
import { EventSubscriptionService } from '../src/service/event-subscription.service';

describe('EventSubscription Controller', () => {
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
      .overrideProvider(EventSubscriptionService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all event-subscriptions ', async () => {
    const getEntities: EventSubscriptionDTO[] = (await request(app.getHttpServer()).get('/api/event-subscriptions').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET event-subscriptions by id', async () => {
    const getEntity: EventSubscriptionDTO = (
      await request(app.getHttpServer())
        .get('/api/event-subscriptions/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create event-subscriptions', async () => {
    const createdEntity: EventSubscriptionDTO = (
      await request(app.getHttpServer()).post('/api/event-subscriptions').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update event-subscriptions', async () => {
    const updatedEntity: EventSubscriptionDTO = (
      await request(app.getHttpServer()).put('/api/event-subscriptions').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update event-subscriptions from id', async () => {
    const updatedEntity: EventSubscriptionDTO = (
      await request(app.getHttpServer())
        .put('/api/event-subscriptions/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE event-subscriptions', async () => {
    const deletedEntity: EventSubscriptionDTO = (
      await request(app.getHttpServer())
        .delete('/api/event-subscriptions/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
