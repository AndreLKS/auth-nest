import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { Companies } from 'src/tenanted/companies/companies.entity';
import { CompaniesService } from 'src/tenanted/companies/companies.service';
import { CreateCompaniesDto } from 'src/tenanted/companies/dto/create-companies.dto';
import { CreateEmployeesDto } from 'src/tenanted/employees/dto/create-employees.dto';
import { UpdateEmployeesDto } from 'src/tenanted/employees/dto/update-employees.dto';
import { Employees } from 'src/tenanted/employees/employees.entity';
import { EmployeesService } from 'src/tenanted/employees/employees.service';
import { EntityNotFoundError } from 'typeorm';
import { DefaultResponseDto } from './dto/default-response.dto';
import { CompanyIntegrationDto } from './dto/senior/company-integration.dto';
import { EmployeeIntegrationDto } from './dto/senior/employee-integration.dto';
import { UserIntegrationDto } from './dto/senior/user-integration.dto';

@Injectable()
export class SeniorIntegrationService {
    private readonly companyService: CompaniesService;
    private readonly employeeService: EmployeesService;
    private readonly httpService: HttpService;

    constructor(
        @Inject(CompaniesService) companyService: CompaniesService,
        @Inject(EmployeesService) employeeService: EmployeesService, 
        @Inject(HttpService) httpService: HttpService) {
        this.companyService = companyService;
        this.employeeService = employeeService;
        this.httpService = httpService;
    }

    private async createCompany(company: CompanyIntegrationDto): Promise<Companies> {
        let companyEntity : Companies;

        try {
            companyEntity = await this.companyService.findOneOrFail({ onPremiseId: company.id });
        }
        catch(error) {
            if(error instanceof EntityNotFoundError){
                const newCompany = plainToInstance(CreateCompaniesDto, company);
                newCompany.onPremiseId = company.id;
                companyEntity = await this.companyService.create(newCompany);
            }
            else {
                throw error;            
            }
        }

        return companyEntity;
    }

    private async createEmployee(employee: EmployeeIntegrationDto, company: Companies, userId: number): Promise<Employees> {
        let employeeEntity : Employees;
        
        try{
            employeeEntity = await this.employeeService.findOneOrFail({ onPremiseId: employee.id });
            const {id, ...updateData} = employee;
            const updateEmployee = plainToInstance(UpdateEmployeesDto, updateData);
            updateEmployee.onPremiseId = id;
            updateEmployee.company = company;
            updateEmployee.userId = userId;
            employeeEntity = await this.employeeService.update(employeeEntity.id, updateEmployee);
        } 
        catch(error) {
            if(error instanceof EntityNotFoundError){
                const newEmployee = plainToInstance(CreateEmployeesDto, {...employee, id: null});
                newEmployee.onPremiseId = employee.id;
                newEmployee.company = company;
                newEmployee.userId = userId;
                employeeEntity = await this.employeeService.create(newEmployee);
            }
            else {
                throw error;
            }
        }

        return employeeEntity;
    } 

    private async userExists(token: string, tenant:string, username: string): Promise<boolean> {
        let response: AxiosResponse;

        try{
            response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + `/${tenant}/api/users/findByFilter?username=${username}`, {headers: {'Authorization': `${token}`}}));
        }
        catch(error) {
            if(error.response.status === 404) {
                return false;
            }
            
            throw error;
        }

        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`Error finding user: ${response.data.message}`);
        }

        return true;

    }

    async getUserIdByUsername(username: string, tenant: string, token: string): Promise<number> {
        const response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + `/${tenant}/api/users/findByFilter?username=${username}`, {headers: {'Authorization': `${token}`}}));

        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`Error finding user: ${response.data.message}`);
        }

        return response.data.id;
    }

    private async updateUserPassword(token: string, tenant: string, userId: number, password: string): Promise<void> {
        const response = await firstValueFrom(this.httpService.put(process.env.URL_AUTH + `/${tenant}/api/users/update-password/${userId}`, {password}, {headers: {'Authorization': `${token}`}}));
    }

    private async createUser(token: string, tenant: string, user: UserIntegrationDto): Promise<number> {
        user = { ...user, roles: ['USER_CLOCK'] };

        let response: AxiosResponse;

        if(!await this.userExists(token, tenant, user.username)) {
            console.log('User not found, creating...');
            response = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + `/${tenant}/api/users`, user, {headers: {'Authorization': `${token}`}}));
        }
        else {
            console.log('User found, updating...');
            const userId = await this.getUserIdByUsername(user.username, tenant, token);

            try{
                response = await firstValueFrom(this.httpService.put(process.env.URL_AUTH + `/${tenant}/api/users/${userId}`, user, {headers: {'Authorization': `${token}`}}));
            }
            catch(error) {
                console.log(error);

                throw error;
            }

            if(user.password){
                await this.updateUserPassword(token, tenant, userId, user.password);
            }   

        }

        if(response.status !== 200 && response.status !== 201) {
            throw new Error(`Error creating user: ${response.data.message}`);
        }
        
        return response.data.id;
    }

    async execute(company: CompanyIntegrationDto, employee: EmployeeIntegrationDto, tenant: string, token: string): Promise<DefaultResponseDto> {
    
        const companyEntity = await this.createCompany(company);
     
        const userId = await this.createUser(token, tenant, plainToInstance(UserIntegrationDto, employee));

        const employeeEntity = await this.createEmployee(employee, companyEntity, userId);

        return <DefaultResponseDto>{ status: true, message: 'Integração executada com sucesso'};
    };

    async executeBatch(company: CompanyIntegrationDto, employees: EmployeeIntegrationDto[], tenant: string, token: string): Promise<DefaultResponseDto> {
    
        const companyEntity = await this.createCompany(company);

        for(const employee of employees) {
            const userId = await this.createUser(token, tenant, plainToInstance(UserIntegrationDto, employee));
            await this.createEmployee(employee, companyEntity, userId);
        }
        

        return <DefaultResponseDto>{ status: true, message: 'Integração executada com sucesso'};
    };

}
