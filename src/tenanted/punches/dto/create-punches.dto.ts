import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Employees } from "src/tenanted/employees/employees.entity";

export class CreatePunchesDto {

    @ApiProperty()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    time: Date;

    @ApiProperty()
    @IsNotEmpty()
    timeAsMinutes: number;

    @ApiProperty()
    @IsNotEmpty()
    employee: Employees;
    
    @ApiProperty()
    @IsOptional()
    ipAddress: string;

    @ApiProperty()
    @IsOptional()
    deviceInfo: string;

    @ApiProperty()
    @IsOptional()
    latitude: string;

    @ApiProperty()
    @IsOptional()
    longitude: string;

    @ApiProperty()
    @IsOptional()
    exported: boolean;    

}
