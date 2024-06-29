import { EntityRepository, Repository } from 'typeorm';
import { AppSetting } from '../domain/app-setting.entity';

@EntityRepository(AppSetting)
export class AppSettingRepository extends Repository<AppSetting> {}
