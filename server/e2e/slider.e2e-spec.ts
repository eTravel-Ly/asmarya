import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SliderDTO } from '../src/service/dto/slider.dto';
import { SliderService } from '../src/service/slider.service';

describe('Slider Controller', () => {
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
      .overrideProvider(SliderService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all sliders ', async () => {
    const getEntities: SliderDTO[] = (await request(app.getHttpServer()).get('/api/sliders').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET sliders by id', async () => {
    const getEntity: SliderDTO = (
      await request(app.getHttpServer())
        .get('/api/sliders/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create sliders', async () => {
    const createdEntity: SliderDTO = (await request(app.getHttpServer()).post('/api/sliders').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update sliders', async () => {
    const updatedEntity: SliderDTO = (await request(app.getHttpServer()).put('/api/sliders').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update sliders from id', async () => {
    const updatedEntity: SliderDTO = (
      await request(app.getHttpServer())
        .put('/api/sliders/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE sliders', async () => {
    const deletedEntity: SliderDTO = (
      await request(app.getHttpServer())
        .delete('/api/sliders/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});