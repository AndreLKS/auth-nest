import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { EntityNotFoundError } from 'typeorm';
import { EmployeesService } from '../employees/employees.service';
import { CreatePunchesDto } from '../punches/dto/create-punches.dto';
import { PunchesService } from '../punches/punches.service';
import { PunchClockDeviceDto } from './dto/punch-clock-device.dto';
import { PunchClockDto } from './dto/punch-clock.dto';

@Injectable()
export class ClockService {
    private readonly punchesService: PunchesService;
    private readonly employeesService: EmployeesService;
    private readonly authService : AuthService;

    constructor(punchesService: PunchesService, employeesService: EmployeesService, authService: AuthService) { 
        this.punchesService = punchesService;
        this.employeesService = employeesService;
        this.authService = authService;
    }

    async punchClock(punchClockDto: PunchClockDto, userId: number): Promise<CreatePunchesDto> {
        
        let employee;

        try{
            employee = await this.employeesService.findOneOrFail({ userId: userId });
        }
        catch(error){
            if(error instanceof EntityNotFoundError){
                throw new UnauthorizedException();
            }

            throw error;
        }

        const clock = new CreatePunchesDto();
        clock.date = new Date();
        //clock.date = new Date(punchClockDto.dateTime);
        clock.time = clock.date
        clock.deviceInfo = punchClockDto.deviceInfo;
        clock.employee = employee;
        clock.ipAddress = punchClockDto.ipAddress;
        clock.latitude = punchClockDto.latitude;
        clock.longitude = punchClockDto.longitude;
        clock.timeAsMinutes = clock.date.getHours() * 60 + clock.date.getMinutes(); 
        
        return await this.punchesService.create(clock);
    }

    async punchWithLogin(punchClockDevice: PunchClockDeviceDto, tenantName: string): Promise<CreatePunchesDto> {
        const userId = await this.authService.getUserId(punchClockDevice.username, punchClockDevice.password, tenantName);
        const punchClock = plainToInstance(PunchClockDto, punchClockDevice);

        return await this.punchClock(punchClock, userId);
    }

    async punchWithLoginAppKey(punchClockDevice: PunchClockDeviceDto, tenantName: string, appkey: string): Promise<CreatePunchesDto> {
        const userId = await this.authService.getUserIdAppKey(punchClockDevice.username, punchClockDevice.password, tenantName, appkey);
        const punchClock = plainToInstance(PunchClockDto, punchClockDevice);

        return await this.punchClock(punchClock, userId);
    }
}
