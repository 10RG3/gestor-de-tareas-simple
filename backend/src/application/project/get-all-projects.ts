import { Project } from '../../domain/models/project';
import { ProjectRepository } from '../../domain/repositories/project-repository';

export class GetAllProjects {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return await this.projectRepository.findAll();
  }
}