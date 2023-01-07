import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    color?: string;

    @JoinTable()
    @ManyToMany(type => Tag, tag => tag.todos, { cascade: true })
    tags?: Tag[];
}
