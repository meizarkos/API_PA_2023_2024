import { Model, ModelStatic } from 'sequelize';
import * as models from './index';

export type CrudAdmin = {
    model: ModelStatic<Model<any, any>>;
    route: string;
    forbidden: Array<string>;
    noReturn?: Array<string>;
};

export const company: CrudAdmin = {
    model: models.Company,
    route: '/companies',
    forbidden: ['uuid'],
    noReturn: ['password']
};

export const user: CrudAdmin = {
    model: models.User,
    route: '/users',
    forbidden: ['uuid'],
    noReturn: ['password']
};

export const ticket: CrudAdmin = {
    model: models.Ticket,
    route: '/tickets',
    forbidden: ['uuid']
};

export const response: CrudAdmin = {
    model: models.Response,
    route: '/responses',
    forbidden: ['uuid']
};

export const employe: CrudAdmin = {
    model: models.Employe,
    route: '/employe',
    forbidden: ['uuid'],
    noReturn: ['password']
}

export const team: CrudAdmin = {
    model:models.Team,
    route: '/team',
    forbidden: ['uuid']
}

export const employe_team: CrudAdmin = {
    model: models.EmployeTeam,
    route: '/employeTeam',
    forbidden: ['uuid']
}

