import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      console.log('Tentative de récupération des tâches...');
      const tasks = await this.prisma.task.findMany();
      console.log('Tâches récupérées :', tasks);
      return tasks;
    } catch (error) {
      console.error('Erreur dans TaskRepository.findAll :', error);
      throw new Error('Impossible de récupérer les tâches');
    }
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(data: Prisma.taskCreateInput | (Prisma.taskUpdateInput & { id: number })) {
    if (!('id' in data)) {
      // Création d'une nouvelle tâche
      return this.prisma.task.create({ data: data as Prisma.taskCreateInput });
    }

    // Mise à jour d'une tâche existante
    const { id, ...updateData } = data;
    return this.prisma.task.update({
      where: { id },
      data: updateData as Prisma.taskUpdateInput,
    });
  }
}
