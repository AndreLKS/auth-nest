import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DefaultResponseDto {

    @ApiProperty()
    @IsNotEmpty()
    status: boolean;

    @ApiProperty()
    @IsNotEmpty()
    message: string;
}