import { Request, Response } from 'express';
import { GetAllProjects } from '../../../application/project/get-all-projects';

export class ProjectController {
  constructor(private getAllProjects: GetAllProjects) {}

  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.getAllProjects.execute();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}