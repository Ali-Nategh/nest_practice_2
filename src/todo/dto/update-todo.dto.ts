import { IsString, IsOptional } from "class-validator";

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsString()
    readonly color?: string;

    @IsOptional()
    @IsString({ each: true })
    readonly tags?: string[];
}
