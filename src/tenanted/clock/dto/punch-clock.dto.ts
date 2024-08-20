import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class PunchClockDto {

    @ApiProperty()
    @IsNotEmpty()
    dateTime: Date;

    @ApiProperty()
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
}
