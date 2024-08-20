import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Companies } from 'src/tenanted/companies/companies.entity';
import { CreateEmployeesDto } from './create-employees.dto';


export class UpdateEmployeesDto extends PartialType(CreateEmployeesDto) {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    pis: number

    @ApiProperty()
    @IsNotEmpty()
    company: Companies;
    
    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    onPremiseId: string;

    @ApiProperty()
    active: boolean;
}
