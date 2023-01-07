import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        {
            id: 1,
            title: 'test title',
        },
    ];

    findAll() {
        return this.todos;
    }

    findOne(id: string) {
        return this.todos.find(item => item.id === +id);
    }

    create(createTodoDto: any) {
        this.todos.push(createTodoDto)
    }

    update(id: string, updateTodoDto: any) {
        const existingTodo = this.findOne(id);
        if (existingTodo) {
            // update existing entity
        }
    }

    remove(id: string) {
        const todoIndex = this.todos.findIndex(item => item.id === +id);
        if (todoIndex >= 0) {
            this.todos.splice(todoIndex, 1);
        }
    }
}
