import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import TaskRepository from '../Repositories/TaskRepository';

@Controller()
export default class TaskController {
  constructor(
    private readonly useCaseFactory: UseCaseFactory,
    private readonly taskRepository: TaskRepository, // Ajoutez cette ligne
  ) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: { name: string }) {
    try {
      if (!dto.name || dto.name.trim() === '') {
        throw new BadRequestException('Le nom de la tâche est requis');
      }

      const task = await this.taskRepository.save({ name: dto.name });
      return { success: true, task }; // Retourne une réponse JSON valide
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
      throw new InternalServerErrorException('Erreur interne lors de la création de la tâche');
    }
  }

  @Patch('/tasks/:id')
  async update(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
