import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CartItemDTO } from '../src/service/dto/cart-item.dto';
import { CartItemService } from '../src/service/cart-item.service';

describe('CartItem Controller', () => {
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
      .overrideProvider(CartItemService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all cart-items ', async () => {
    const getEntities: CartItemDTO[] = (await request(app.getHttpServer()).get('/api/cart-items').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET cart-items by id', async () => {
    const getEntity: CartItemDTO = (
      await request(app.getHttpServer())
        .get('/api/cart-items/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create cart-items', async () => {
    const createdEntity: CartItemDTO = (await request(app.getHttpServer()).post('/api/cart-items').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update cart-items', async () => {
    const updatedEntity: CartItemDTO = (await request(app.getHttpServer()).put('/api/cart-items').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update cart-items from id', async () => {
    const updatedEntity: CartItemDTO = (
      await request(app.getHttpServer())
        .put('/api/cart-items/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE cart-items', async () => {
    const deletedEntity: CartItemDTO = (
      await request(app.getHttpServer())
        .delete('/api/cart-items/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
