import { IsNotEmpty } from "class-validator";

export class ClockResourceDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    roles: string[] = [];
}