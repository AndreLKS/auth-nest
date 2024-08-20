import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { getTenantConnection } from 'src/tenancy/tenancy.utils';
import { resources } from './resources/clock.resource';
import { ClockResourceDTO } from './resources/dto/clock.resource.dto';


@Injectable()
export class TenantSetupService {
    
    private readonly schema: string = 'clock';
    private readonly username: string = 'admin';
    private readonly password: string = 'admin';
    private readonly roleUser: string = 'USER_CLOCK';
    private readonly roleAdmin: string = 'ADMIN_CLOCK';
    private readonly resources: Array<ClockResourceDTO> = resources;
    private readonly authService: AuthService;
    private readonly httpService: HttpService;

    constructor(@Inject(AuthService) authService: AuthService, @Inject(HttpService) httpService: HttpService) {
        this.authService = authService;
        this.httpService = httpService;
    }

    async createSchema(tenantName: string) {
        const connectionPrincipal = await getTenantConnection(tenantName, this.schema);
        await connectionPrincipal.query(`CREATE SCHEMA IF NOT EXISTS ${this.schema}`);
        await connectionPrincipal.runMigrations();
        await connectionPrincipal.close();
    }

    async generateRoleResources(tenantName: string) {
        let token : string;
        
        try {
            token = await this.authService.login(this.username, this.password, tenantName);
        }
        catch(error) {
            throw new InternalServerErrorException("Could not login to tenant");
        }

        await this.createRoles(token, tenantName);

        for(const resource of this.resources) {
            await this.createResource(resource, token, tenantName);
        }

        await this.setDefaultResources(token, tenantName);
    }

    async resourceExists(resourceName: string, token: string, tenantName: string): Promise<boolean> {
        let response: AxiosResponse;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{        
            response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + `/${tenantName}/api/resources/findByFilter?name=${resourceName}`, config));
        }
        catch(error){
            if(error.response && error.response.status === 404){
                return false;
            }

            throw error;
        }

        return true
    }

    async createResource(resource: ClockResourceDTO, token: string, tenantName: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        if(! await this.resourceExists(resource.name, token, tenantName)) {
            const response: AxiosResponse = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + `/${tenantName}/api/resources/`, resource, config));
        
            if(response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message);
            }
        }
        
    }

    async roleExists(roleName: string, token: string, tenantName: string): Promise<boolean> {
        let response: AxiosResponse;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        try{
            response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + `/${tenantName}/api/roles/findByFilter?name=${roleName}`, config));
        }
        catch(error){
            if(error.response && error.response.status === 404){
                return false;
            }

            throw error;
        }

        return true;
    }

    async createRoles(token: string, tenantName: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        if(! await this.roleExists(this.roleUser, token, tenantName)) {
            const response: AxiosResponse = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + `/${tenantName}/api/roles/`, { name: this.roleUser }, config));

            if(response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message);
            }
        }

        if(! await this.roleExists(this.roleAdmin, token, tenantName)) {
            const response: AxiosResponse = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + `/${tenantName}/api/roles/`, { name: this.roleAdmin }, config));

            if(response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message);
            }

        }
        
    }

    async getRoleId(role: string, token: string, tenantName: string): Promise<number> {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        let response: AxiosResponse;
        try{
            response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + `/${tenantName}/api/roles/findByFilter?name=${role}`, config));
        }
        catch(error){
            if(error.response && error.response.status === 404){
                throw new NotFoundException(`Role ${role} not found`);
            }
            
            throw error;
        }

        if(response.status !== 200 && response.status !== 201) {
            throw new Error(response.data.message);
        }

        return response.data.id;

    }


    async setDefaultResources(token: string, tenantName: string) {
        await this.createRoles(token, tenantName);

        const userResources = this.resources.filter(resource => resource.roles.find(role => role === this.roleUser)).map(resource => resource.name);
        await this.setRoleResources(this.roleUser, userResources, token, tenantName);

        const adminResources = this.resources.filter(resource => resource.roles.find(role => role === this.roleAdmin)).map(resource => resource.name);
        await this.setRoleResources(this.roleAdmin, adminResources, token, tenantName);
    }

    async setRoleResources(role: string, resources: Array<string>, token: string, tenantName: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const roleId = await this.getRoleId(role, token, tenantName);
       

        const response: AxiosResponse = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + `/${tenantName}/api/roles/setResources/${roleId}`, {resources}, config));

        if(response.status !== 200 && response.status !== 201) {
            throw new Error(response.data.message);
        };
    }   
    
}
