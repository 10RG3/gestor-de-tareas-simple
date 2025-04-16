import { Project } from '../../domain/models/project';
import { ProjectRepository } from '../../domain/repositories/project-repository';

export class MemoryProjectRepository implements ProjectRepository {
  private projects: Project[];

  constructor() {
    this.projects = [
      { id: 1, name: "Proyecto Alpha" },
      { id: 2, name: "Proyecto Beta" },
      { id: 3, name: "Proyecto Gamma" }
    ].map(p => new Project(p.id, p.name));
  }

  async findAll(): Promise<Project[]> {
    return [...this.projects];
  }

  async findById(id: number): Promise<Project | null> {
    const project = this.projects.find(p => p.id === id);
    if (!project) {
      return null;
    }
    return project;
  }
}