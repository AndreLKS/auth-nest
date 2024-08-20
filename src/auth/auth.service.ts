
import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private readonly httpService: HttpService) { }

    async validateUserFromAuthAPI(token: string, tenantName: string): Promise<Observable<AxiosResponse<any>>> {

        const config = {
            headers: { Authorization: `${token}` }
        };
        console.log(tenantName);
        const response = this.httpService.get(process.env.URL_AUTH + '/' + `${tenantName}` + '/api/users/current', config);


        return response.toPromise()
            .then(axiosResponse => {
                if (axiosResponse.status === 200 && axiosResponse.data) {
                    return axiosResponse.data;
                }
            })
            .catch(reason => {
                return null;
            });
    }

   
    async validateToken(request: Request, payload: any) {

        const tenantName = request.params['tenant'];

        const token = request.headers.authorization;

        if (!tenantName) {
            return null;
        }

        if (!token) {
            return null;
        }

        const timeDiff = payload.exp - payload.iat;

        if (timeDiff <= 0) {
            return null;
        }

        const user = this.validateUserFromAuthAPI(token, tenantName);

        return user;        
    }

    async getUserId(username: string, password: string, tenantName: string): Promise<number> {
        const token = await this.login(username, password, tenantName);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let response: AxiosResponse;
        
        try{
            response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + '/' + `${tenantName}` + '/api/users/current', config));
        } 
        catch(error){
            throw new UnauthorizedException();
        }    
    
        if(response.status !== 200 && response.status !== 201) {
            throw new UnauthorizedException();
        }

        return response.data.id;  
    }

    async getUserIdAppKey(username: string, password: string, tenantName: string, appkey: string): Promise<number> {

        const token = await this.loginAppKey(username, password, tenantName, appkey);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let response: AxiosResponse;
        
        try{
            response = await firstValueFrom(this.httpService.get(process.env.URL_AUTH + '/' + `${tenantName}` + '/api/users/current', config));
        } 
        catch(error){
            throw new UnauthorizedException();
        }    
    
        if(response.status !== 200 && response.status !== 201) {
            throw new UnauthorizedException();
        }

        return response.data.id;  
    }    

    async login(username: string, password: string, tenantName: string): Promise<string> {

        let response;
        
        try{
            response = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + '/' + `${tenantName}` + '/api/auth/login', { username, password }));
        }
        catch(error){
            throw new UnauthorizedException(); 
        }
        
        if(response.status !== 200 && response.status !== 201) {
            throw new UnauthorizedException();
        }

        const token = response.data.token;

        return token
        
    }

    async loginAppKey(username: string, password: string, tenantName: string, appkey: string): Promise<string> {

        const config = {
            headers: { 'x-sancon-app-key': appkey }
        };

        let response;
        
        try{
            response = await firstValueFrom(this.httpService.post(process.env.URL_AUTH + '/' + `${tenantName}` + '/api/auth/loginColetor', { username, password }, config));
        }
        catch(error){
            throw new UnauthorizedException(); 
        }
        
        if(response.status !== 200 && response.status !== 201) {
            throw new UnauthorizedException();
        }

        const token = response.data.token;

        return token
        
    }    

}
