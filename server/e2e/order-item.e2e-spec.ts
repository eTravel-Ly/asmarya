import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { OrderItemDTO } from '../src/service/dto/order-item.dto';
import { OrderItemService } from '../src/service/order-item.service';

describe('OrderItem Controller', () => {
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
      .overrideProvider(OrderItemService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all order-items ', async () => {
    const getEntities: OrderItemDTO[] = (await request(app.getHttpServer()).get('/api/order-items').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET order-items by id', async () => {
    const getEntity: OrderItemDTO = (
      await request(app.getHttpServer())
        .get('/api/order-items/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create order-items', async () => {
    const createdEntity: OrderItemDTO = (await request(app.getHttpServer()).post('/api/order-items').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update order-items', async () => {
    const updatedEntity: OrderItemDTO = (await request(app.getHttpServer()).put('/api/order-items').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update order-items from id', async () => {
    const updatedEntity: OrderItemDTO = (
      await request(app.getHttpServer())
        .put('/api/order-items/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE order-items', async () => {
    const deletedEntity: OrderItemDTO = (
      await request(app.getHttpServer())
        .delete('/api/order-items/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});