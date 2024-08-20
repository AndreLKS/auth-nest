import { Body, Controller, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Resource } from 'src/decorators/resource.decorator';
import { ClockService } from './clock.service';
import { PunchClockDeviceDto } from './dto/punch-clock-device.dto';
import { PunchClockDto } from './dto/punch-clock.dto';

@ApiTags('clock')
@Controller('clock')
export class ClockController {
    
    constructor(private readonly clockService: ClockService) {}
    
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Resource('clock://clock/punch/_create_punch')
    @ApiBearerAuth()
    @ApiParam({name: 'tenant', type: 'string'})
    @Post('punch')
    punchClock(@Body() punchClockDto: PunchClockDto, @Req() req: any) {
        const userId = req.user.id;
        return this.clockService.punchClock(punchClockDto, userId);
    }

    @ApiParam({name: 'tenant', type: 'string'})
    @Post('punch/device')
    puchClockDevice(@Param('tenant') tenantName: string, @Body() punchClockDto: PunchClockDeviceDto, @Req() request) {
        // Usuario e senha
        //return this.clockService.punchWithLogin(punchClockDto, tenantName);

        const appKeyHeader = request.headers['x-sancon-app-key'] as string;

        if(appKeyHeader === undefined){
            throw new UnauthorizedException('Invalid App-Key');
        }

        return this.clockService.punchWithLoginAppKey(punchClockDto, tenantName, appKeyHeader);
    }
    
}
