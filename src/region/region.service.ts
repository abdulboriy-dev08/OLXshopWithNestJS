import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private Prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      let data = await this.Prisma.regions.create({ data: createRegionDto });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let regions = await this.Prisma.regions.findMany();
      if (!regions.length) return { message: 'Regions table empty' };

      return { regions };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let region = await this.Prisma.regions.findFirst({ where: { id: +id } });
      if (!region) throw new NotFoundException('Region not found ❗');

      return { region };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let region = await this.Prisma.regions.findFirst({ where: { id: +id } });
      if (!region) throw new NotFoundException('Region not found ❗');

      let newRegion = await this.Prisma.regions.update({
        where: { id: +id },
        data: updateRegionDto,
      });

      return { newRegion };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let region = await this.Prisma.regions.findFirst({ where: { id: +id } });
      if (!region) throw new NotFoundException('Region not found ❗');

      await this.Prisma.regions.delete({ where: { id: +id } });
      return { message: 'Region is successfully deleted ✅' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
