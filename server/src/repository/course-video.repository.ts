import { EntityRepository, Repository } from 'typeorm';
import { CourseVideo } from '../domain/course-video.entity';

@EntityRepository(CourseVideo)
export class CourseVideoRepository extends Repository<CourseVideo> {}
