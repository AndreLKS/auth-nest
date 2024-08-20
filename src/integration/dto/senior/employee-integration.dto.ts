import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EmployeeIntegrationDto {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    pis: number;

    @ApiProperty()
    @IsNotEmpty()
    companyId: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    password: string;

}