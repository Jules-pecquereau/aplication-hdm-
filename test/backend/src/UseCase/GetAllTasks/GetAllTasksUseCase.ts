import { BadRequestException, Injectable } from '@nestjs/common';
import { task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class GetAllTasksUseCase
  implements UseCase<Promise<task[]>, []>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle() {
    try {
      console.log('Récupération des tâches...');
      const tasks = await this.taskRepository.findAll();
      console.log('Tâches récupérées :', tasks);
      return tasks;
    } catch (error) {
      console.error('Erreur dans GetAllTasksUseCase :', error);
      throw new BadRequestException(error.message);
    }
  }
}
