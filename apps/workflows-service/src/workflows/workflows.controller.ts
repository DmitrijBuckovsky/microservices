import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto, UpdateWorkflowDto, WorkflowDto } from '@app/workflows';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('workflows')
export class WorkflowsController {
  private readonly logger = new Logger(WorkflowsController.name);

  constructor(private readonly workflowsService: WorkflowsService) {}

  @MessagePattern('workflows.create')
  create(@Payload() createWorkflowDto: CreateWorkflowDto): Promise<WorkflowDto> {
    this.logger.log('createWorkflowDto', createWorkflowDto);
    return this.workflowsService.create(createWorkflowDto);
  }

  @Post()
  createHttp(@Body() createWorkflowDto: CreateWorkflowDto): Promise<WorkflowDto> {
    console.log('createWorkflowDto', createWorkflowDto);
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkflowDto: UpdateWorkflowDto) {
    return this.workflowsService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(+id);
  }
}
