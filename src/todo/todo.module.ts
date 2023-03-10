import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports: [TypeOrmModule.forFeature([Todo, Tag])],
    controllers: [TodoController],
    providers: [
        {
            provide: TodoService,
            useClass: TodoService,
        },
    ],
})
export class TodoModule { }
