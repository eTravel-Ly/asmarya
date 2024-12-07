import { EntityRepository, Repository } from 'typeorm';
import { Sheikh } from '../domain/sheikh.entity';

@EntityRepository(Sheikh)
export class SheikhRepository extends Repository<Sheikh> {}
