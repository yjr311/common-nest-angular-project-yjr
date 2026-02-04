import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Repository } from 'typeorm';
import { success } from 'src/common/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { UserContext } from 'src/common/services/user-context.service';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalepository: Repository<Hospital>,
    private readonly userContest: UserContext
  ) { }

  async create(createHospitalDto: CreateHospitalDto) {
    const userId = this.userContest.user?.userId; // 自动获取当前用户
    if (!userId) {
      throw new UnauthorizedException('用户信息不存在');
    }
    const result = this.hospitalepository.create({
      ...createHospitalDto,
      userId
    });
    await this.hospitalepository.save(result);
    return success({}, '新增成功');
  }

  async findAll() {
    const userId = this.userContest.user?.userId; // 自动获取当前用户
    if (!userId) {
      throw new UnauthorizedException('用户信息不存在');
    }
    const hospitals = await this.hospitalepository.find({
      where: { userId }
    });

    return success({
      hospitals // hospitals: hospitals
    }, '查询成功');
  }

  async findOne(id: number) {
    const userId = this.userContest.user?.userId; // 自动获取当前用户
    if (!userId) {
      throw new UnauthorizedException('用户信息不存在');
    }
    const hospitals = await this.hospitalepository.findOne({ where: { id, userId } });

    return success({
      hospitals
    }, '查询成功');
  }

  async update(id: number, updateHospitalDto: UpdateHospitalDto) {
    const userId = this.userContest.user?.userId; // 自动获取当前用户
    if (!userId) {
      throw new UnauthorizedException('用户信息不存在');
    }
    const exist = await this.hospitalepository.findOne({
      where: { id, userId },
    });

    if (!exist) {
      throw new NotFoundException('记录不存在或无权修改');
    }
    await this.hospitalepository.update(id, updateHospitalDto);
    return success({}, '更新成功');
  }

  async remove(id: number) {
    const userId = this.userContest.user?.userId; // 自动获取当前用户
    if (!userId) {
      throw new UnauthorizedException('用户信息不存在');
    }
    const result = await this.hospitalepository.delete({
      id,
      userId
    })

    if (result.affected === 0) {
      throw new NotFoundException('记录不存在或无权删除');
    }
    return success({}, '删除成功');
  }
}
