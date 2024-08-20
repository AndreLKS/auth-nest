import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateCompaniesDto {

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