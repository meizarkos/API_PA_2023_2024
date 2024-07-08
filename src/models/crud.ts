import { Model, ModelStatic } from 'sequelize';
import * as models from './index';

export type CrudAdmin = {
    model: ModelStatic<Model<any, any>>;
    route: string;
    forbidden: Array<string>;
    noReturn?: Array<string>;
    champNameToFillWithTokenId?: any;
    champNameToFindById?: any;
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

export const reunion: CrudAdmin = {
    model: models.Meeting,
    route: '/reunion',
    forbidden: ['uuid']
}

export const invite: CrudAdmin = {
    model: models.Invite,
    route: '/invite',
    forbidden: ['uuid']
}

export const leave: CrudAdmin = {
    model: models.Leave,
    route: '/leave',
    forbidden: ['uuid'],
    champNameToFillWithTokenId: 'id_employe'
}

export const assignation: CrudAdmin = {
    model: models.Assignation,
    route: '/assignation',
    forbidden: ['uuid']
}

export const situation: CrudAdmin = {
    model: models.Situation,
    route: '/situation',
    forbidden: ['uuid']
}

export const invoice: CrudAdmin = {
    model: models.Invoice,
    route: '/invoice',
    forbidden: ['uuid']
}

export const conversation: CrudAdmin = {
    model: models.Conversation,
    route: '/conversation',
    forbidden: ['uuid']
}

export const avis: CrudAdmin = {
    model: models.Avis,
    route: '/avis',
    forbidden: ['uuid']
}

export const annonce: CrudAdmin = {
    model: models.Annonce,
    route: '/annonce',
    forbidden: ['uuid']
}

export const offer: CrudAdmin = {
    model: models.Offer,
    route: '/offer',
    forbidden: ['uuid']
}

