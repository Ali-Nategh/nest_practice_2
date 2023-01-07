import { IsString } from "class-validator";

export class UpdateTodoDto {
    @IsString()
    readonly title?: string;

    @IsString()
    readonly description?: string;

    @IsString()
    readonly color?: string;

    @IsString({ each: true })
    readonly tags?: string[];
}
