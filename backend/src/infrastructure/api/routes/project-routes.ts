import { Router } from 'express';
import { ProjectController } from '../controllers/project-controller';
import { TaskController } from '../controllers/task-controller';

export const createProjectRoutes = (projectController: ProjectController, taskController: TaskController): Router => {
  const router = Router();
  
  // GET /api/projects
  router.get('/', projectController.getProjects.bind(projectController));
  
  // GET /api/projects/:projectId/tasks
  router.get('/:projectId/tasks', taskController.getTasksByProject.bind(taskController));
  
  return router;
};