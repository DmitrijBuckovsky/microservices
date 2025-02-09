import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto, UpdateBuildingDto } from '@app/buildings';

@Controller('buildings')
export class BuildingsController {
   private readonly logger = new Logger(BuildingsController.name);
 
   constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  create(@Body() createBuildingDto: CreateBuildingDto) {
    this.logger.log('createBuildingDto', createBuildingDto);
    return this.buildingsService.create(createBuildingDto);
  }

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.buildingsService.update(+id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingsService.remove(+id);
  }
}
