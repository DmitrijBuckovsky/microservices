import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { CreateWorkflowDto, WorkflowDto } from '@app/workflows';
import { Workflow } from 'apps/workflows-service/src/workflows/entities/workflow.entity';
import { BuildingDto, CreateBuildingDto, UpdateBuildingDto } from '@app/buildings';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingsRepository: Repository<Building>,
  ) {}

  async findAll(): Promise<Building[]> {
    return this.buildingsRepository.find();
  }

  async findOne(id: number): Promise<Building> {
    const building = await this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`Building #${id} does not exist`);
    }
    return building;
  }

  async create(createBuildingDto: CreateBuildingDto): Promise<BuildingDto> {
    const building = this.buildingsRepository.create({
      ...createBuildingDto,
    });
    const newBuildingEntity = await this.buildingsRepository.save(building);

    // Create a workflow for the new building
    const workflow: WorkflowDto = await this.createWorkflow(newBuildingEntity.id);
    return new BuildingDto(newBuildingEntity, workflow);
  }

  async update(
    id: number,
    updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    const building = await this.buildingsRepository.preload({
      id: +id,
      ...updateBuildingDto,
    });

    if (!building) {
      throw new NotFoundException(`Building #${id} does not exist`);
    }
    return this.buildingsRepository.save(building);
  }

  async remove(id: number): Promise<Building> {
    const building = await this.findOne(id);
    return this.buildingsRepository.remove(building);
  }

  async createWorkflow(buildingId: number): Promise<WorkflowDto> {
    const workflow: CreateWorkflowDto = { name: 'My Workflow', buildingId };
    console.log(workflow);
    try {
      const response = await fetch('http://workflows-service:3001/workflows', {
        // const response = await fetch('http://localhost:3001/workflows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workflow),
        });
        const newWorkflow: WorkflowDto = await response.json();
        return newWorkflow;
      } catch (error) {
      throw new Error('Failed to call workflows service');
    }

  }
}
