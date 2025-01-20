export class CreateWorkflowDto {
  name: string;
  buildingId: number;

  public toString(): string {
    return JSON.stringify(this);
  }
}
