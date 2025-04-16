import { Project } from '../models/project';

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: number): Promise<Project | null>;
}