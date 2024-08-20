import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class PunchClockDeviceDto {

    @ApiProperty()
    @IsNotEmpty()
    dateTime: Date;

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
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
