import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from './orm.config';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenantSetupModule } from './tenanted/tenant-setup/tenant-setup.module';
import { TenantsModule } from './tenants/tenants.module';
import { CompaniesModule } from './tenanted/companies/companies.module';
import { EmployeesModule } from './tenanted/employees/employees.module';
import { PunchesModule } from './tenanted/punches/punches.module';
import { IntegrationModule } from './integration/integration.module';
import { ClockModule } from './tenanted/clock/clock.module';
import { AppKeyMiddleware } from './appkey.middleware';
import { AppKeyModule } from './appkey/appkey.module';
import { WebSocketService } from './web-socket/web-socket.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    TenancyModule,
    TenantsModule,
    TenantSetupModule,
    AuthModule,
    AppKeyModule,
    CompaniesModule,
    EmployeesModule,
    PunchesModule,
    IntegrationModule,
    ClockModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppKeyMiddleware)
      .exclude('*');
  }
}
