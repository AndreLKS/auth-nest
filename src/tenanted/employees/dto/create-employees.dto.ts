import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Companies } from "src/tenanted/companies/companies.entity";


export class CreateEmployeesDto {
    
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
    onPremiseId: string;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    active: boolean;
}
