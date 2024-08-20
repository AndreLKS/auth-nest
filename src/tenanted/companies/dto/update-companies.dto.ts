import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCompaniesDto } from './create-companies.dto';


export class UpdateCompaniesDto extends PartialType(CreateCompaniesDto) {
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    inscriptionNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    onPremiseId: string;
}
