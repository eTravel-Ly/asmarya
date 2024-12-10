import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AppSettingDTO } from '../src/service/dto/app-setting.dto';
import { AppSettingService } from '../src/service/app-setting.service';

describe('AppSetting Controller', () => {
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
      .overrideProvider(AppSettingService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all app-settings ', async () => {
    const getEntities: AppSettingDTO[] = (await request(app.getHttpServer()).get('/api/app-settings').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET app-settings by id', async () => {
    const getEntity: AppSettingDTO = (
      await request(app.getHttpServer())
        .get('/api/app-settings/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create app-settings', async () => {
    const createdEntity: AppSettingDTO = (await request(app.getHttpServer()).post('/api/app-settings').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update app-settings', async () => {
    const updatedEntity: AppSettingDTO = (await request(app.getHttpServer()).put('/api/app-settings').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update app-settings from id', async () => {
    const updatedEntity: AppSettingDTO = (
      await request(app.getHttpServer())
        .put('/api/app-settings/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE app-settings', async () => {
    const deletedEntity: AppSettingDTO = (
      await request(app.getHttpServer())
        .delete('/api/app-settings/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
