import { EntityRepository, Repository } from 'typeorm';
import { Center } from '../domain/center.entity';

@EntityRepository(Center)
export class CenterRepository extends Repository<Center> {}
