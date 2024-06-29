import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from '../web/rest/favorite.controller';
import { FavoriteRepository } from '../repository/favorite.repository';
import { FavoriteService } from '../service/favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteRepository])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
