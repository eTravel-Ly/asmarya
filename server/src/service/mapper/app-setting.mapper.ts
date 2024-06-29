import { AppSetting } from '../../domain/app-setting.entity';
import { AppSettingDTO } from '../dto/app-setting.dto';

/**
 * A AppSetting mapper object.
 */
export class AppSettingMapper {
  static fromDTOtoEntity(entityDTO: AppSettingDTO): AppSetting {
    if (!entityDTO) {
      return;
    }
    let entity = new AppSetting();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: AppSetting): AppSettingDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new AppSettingDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
