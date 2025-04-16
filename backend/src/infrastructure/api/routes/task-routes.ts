import { Router } from 'express';
import { TaskController } from '../controllers/task-controller';

export const createTaskRoutes = (taskController: TaskController): Router => {
  const router = Router();
  
  // POST /api/tasks
  router.post('/', taskController.createTask.bind(taskController));
  
  // PATCH /api/tasks/:taskId
  router.patch('/:taskId', taskController.updateTaskStatus.bind(taskController));
  
  // GET /api/tasks/with-shared-tags
  router.get('/with-shared-tags', taskController.getTasksWithSharedTags.bind(taskController));
  
  return router;
};