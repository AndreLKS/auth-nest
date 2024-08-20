import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CompanyIntegrationDto {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    inscriptionNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;
}
