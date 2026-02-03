import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/hos/save')
  create(@Body() createHospitalDto: CreateHospitalDto, @CurrentUser('userId') userId: number) {
    return this.hospitalsService.create(createHospitalDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: any) {
    return this.hospitalsService.findAll(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser('userId') userId: number) {
    return this.hospitalsService.findOne(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, 
  @Body() updateHospitalDto: UpdateHospitalDto,
  @CurrentUser('userId') userId: number
) {
    return this.hospitalsService.update(id, updateHospitalDto, userId);
  }

  /**
   * 
   * @param id @Req() req: any
   * @param req req.user.userId
   * @Roles @UseGuards -> 应用启动时
   * RolesGuard.canActivate -> 请求进来时
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)  
  @Roles('admin') // 装饰器不是“按写的顺序执行”的 在应用启动时就已经把 metadata 贴好了
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser('userId') userId: number) {
    return this.hospitalsService.remove(id, userId);
  }
}
