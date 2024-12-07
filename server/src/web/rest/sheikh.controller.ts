import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { UserDTO } from '../../service/dto/user.dto';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UserService } from '../../service/user.service';

@Controller('api/admin/sheikh')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('user-resource')
export class SheikhController {}
