import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Tag } from './entities/tag.entity';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }

    findAll() {
        return this.todoRepository.find({ relations: ['tags'] });
    }

    async findOne(id: string) {
        const todo = await this.todoRepository.findOne({ where: { id: +id }, relations: ['tags'] });
        // if (!todo) throw new HttpException(`todo #${id} not found`, HttpStatus.NOT_FOUND)
        if (!todo) throw new NotFoundException(`todo #${id} not found`);
        return todo
    }

    async create(createTodoDto: CreateTodoDto) {
        let tags = createTodoDto.tags;

        let tagsChanged: Tag[] = [];
        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                tagsChanged.push(await this.preloadTagByName(tags[i]))
            }
        }

        const todo = this.todoRepository.create({
            ...createTodoDto,
            tags: [...tagsChanged],
        });
        return this.todoRepository.save(todo);
    }

    async update(id: string, updateTodoDto: UpdateTodoDto) {
        let tags = updateTodoDto.tags;

        let tagsChanged: Tag[] = [];
        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                tagsChanged.push(await this.preloadTagByName(tags[i]))
            }
        }

        const todo = await this.todoRepository.preload({
            id: +id,
            ...updateTodoDto,
            tags: [...tagsChanged],
        });
        if (!todo) throw new NotFoundException(`Todo #${id} not found`);
        return this.todoRepository.save(todo);
    }

    async remove(id: string) {
        const todo = await this.findOne(id);
        return this.todoRepository.remove(todo);
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const existingTag = await this.tagRepository.findOne({ where: { name, } });
        if (existingTag) return existingTag;
        return this.tagRepository.create({ name });
    }
}
