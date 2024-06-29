import { EntityRepository, Repository } from 'typeorm';
import { Learner } from '../domain/learner.entity';

@EntityRepository(Learner)
export class LearnerRepository extends Repository<Learner> {}
