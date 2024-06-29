import { EntityRepository, Repository } from 'typeorm';
import { Slider } from '../domain/slider.entity';

@EntityRepository(Slider)
export class SliderRepository extends Repository<Slider> {}
