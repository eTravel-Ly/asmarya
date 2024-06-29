import { EntityRepository, Repository } from 'typeorm';
import { Activation } from '../domain/activation.entity';

@EntityRepository(Activation)
export class ActivationRepository extends Repository<Activation> {}
