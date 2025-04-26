import { Injectable } from '@nestjs/common';
import { task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<task>, [dto: SaveTaskDto]> {
  constructor() {}

  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */

    return null;
  }
}
