import { Workflow } from 'apps/workflows-service/src/workflows/entities/workflow.entity';

export class WorkflowDto {
  id: number;
  name: string;
  buildingId: number;

  constructor(entity: Workflow) {
    this.id = entity.id;
    this.name = entity.name;
    this.buildingId = entity.buildingId;
  }
}
