export class Task {
  public id: number;
  public projectId: number;
  public title: string;
  public description: string;
  public status: string = "pendiente";
  public tags: string[];

  constructor(
    id: number,
    projectId: number,
    title: string,
    description: string = "",
    status: string = "pendiente",
    tags: string[] = []
  ) {
    this.id = id;
    this.projectId = projectId;
    this.title = title;
    this.description = description;
    this.setStatus(status);
    this.tags = tags;
  }

  setStatus(status: string): void {
    const validStatuses = ["pendiente", "en_progreso", "completada"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Estado inválido: ${status}. Los estados válidos son: ${validStatuses.join(", ")}`);
    }
    this.status = status;
  }
}