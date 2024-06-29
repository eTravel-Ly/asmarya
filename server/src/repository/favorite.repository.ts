import { EntityRepository, Repository } from 'typeorm';
import { Favorite } from '../domain/favorite.entity';

@EntityRepository(Favorite)
export class FavoriteRepository extends Repository<Favorite> {}
