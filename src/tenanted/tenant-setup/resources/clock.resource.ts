import { ClockResourceDTO } from "./dto/clock.resource.dto"

const resources: Array<ClockResourceDTO> = [
    {name: 'clock://tenants/_read', description: 'Read all tenants', roles: ['ADMIN_CLOCK']},
    {name: 'clock://clock/punch/_create_punch', description: 'Punch Clock', roles: ['ADMIN_CLOCK', 'USER_CLOCK']},
    {name: 'clock://company/_create', description: 'Create company', roles: ['ADMIN_CLOCK']},
    {name: 'clock://company/_read', description: 'Read all companies', roles: ['ADMIN_CLOCK']},
    {name: 'clock://company/id/_read', description: 'Read company by id', roles: ['ADMIN_CLOCK']},
    {name: 'clock://company/id/_update', description: 'Update company by id', roles: ['ADMIN_CLOCK']},
    {name: 'clock://company/id/_delete', description: 'Delete company by id', roles: ['ADMIN_CLOCK']},
    {name: 'clock://employees/_create', description: 'Create employee', roles: ['ADMIN_CLOCK']},
    {name: 'clock://employees/_read', description: 'Read all employees', roles: ['ADMIN_CLOCK']},
    {name: 'clock://employees/id/_read', description: 'Read employee by id', roles: ['ADMIN_CLOCK',]},
    {name: 'clock://employees/id/_update', description: 'Update employee by id', roles: ['ADMIN_CLOCK']},
    {name: 'clock://employees/id/_delete', description: 'Delete employee by id', roles: ['ADMIN_CLOCK']},
    {name: 'clock://employees/userId/_read', description: 'Read employee by userId', roles: ['ADMIN_CLOCK', 'USER_CLOCK']},
    {name: 'clock://punches/_create', description: 'Create punch', roles: ['ADMIN_CLOCK', 'USER_CLOCK']},
    {name: 'clock://punches/_read', description: 'Read all punches', roles: ['ADMIN_CLOCK', 'USER_CLOCK']},
    {name: 'clock://punches/history/_read', description: 'Read punch history', roles: ['ADMIN_CLOCK','USER_CLOCK']},
    {name: 'clock://punches/export/_read', description: 'Export punches', roles: ['ADMIN_CLOCK']},
    {name: 'clock://punches/export/startDate/endDate/_read', description: 'Export punches by startDate and endDate', roles: ['ADMIN_CLOCK' , 'USER_CLOCK']},
    {name: 'clock://punches/id/_read', description: 'Read punch by id', roles: ['ADMIN_CLOCK', 'USER_CLOCK']},
    {name: 'clock://punches/id/_update', description: 'Update punch by id', roles: ['ADMIN_CLOCK']},
    {name: 'clock://punches/id/_delete', description: 'Delete punch by id', roles: ['ADMIN_CLOCK']}, 
]

export { resources }