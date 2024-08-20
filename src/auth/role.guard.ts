import { HttpService } from '@nestjs/axios';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly _reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {

    const resource: string[] = this._reflector.get<string[]>(
      'resource',
      context.getHandler(),
    );

    // const resource = 'app://clock/create_user';

    if (!resource) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const tenantName = request.params['tenant'];

    const token = request.headers.authorization;

    const user = request.user;

    if (!tenantName) {
      throw new ForbiddenException('Getting tenant was failed.');
    }

    if (!token) {
      throw new ForbiddenException('Getting token was failed.');
    }

    if (!user) {
      throw new ForbiddenException('Getting user was failed.');
    }

    const userRoles = user.roles.map(r => r.name);

    if (!userRoles) {
      throw new ForbiddenException('Getting user roles was failed.');
    }

    const httpService = new HttpService();

    const config = {
      headers: { Authorization: `${token}` }
    };

    const response = await httpService.post(process.env.URL_AUTH + '/' + `${tenantName}` + '/api/roles/resources', { roles: userRoles }, config).toPromise();
    
    if (!response) {
      throw new BadRequestException();
    }

    const userResources = response.data.map(role => (role.resources.map(r => r.name)));

    if (!userResources) {
      throw new ForbiddenException('Getting user resources was failed.');
    }

    // console.log(userResources);

    const hasRole = userResources.some(r => r.includes(resource));

    // console.log(hasRole);

    return hasRole;
  }
}