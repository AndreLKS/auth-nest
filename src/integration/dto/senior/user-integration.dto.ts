import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserIntegrationDto {

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString({ each: true })
    readonly roles: string[]

}