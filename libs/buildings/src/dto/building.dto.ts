import { WorkflowDto } from "@app/workflows";
import { Building } from "apps/virtual-facility/src/buildings/entities/building.entity";

export class BuildingDto {
    id: number;
    name: string;
    workflow?: WorkflowDto;

    constructor(building: Building, workflow?: WorkflowDto) {
        this.id = building.id;
        this.name = building.name;
        this.workflow = workflow;
    }
}
