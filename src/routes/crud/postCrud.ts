import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { getAllErrors } from '../../utils';
import { ValidationError, UniqueConstraintError } from 'sequelize';


async function createFunctionId(req: Request, res: Response, config: CrudAdmin) {
    try {
        const authorizedAttributes = Object.keys(config.model.getAttributes()).filter(
            (attr) => !config.forbidden.includes(attr)
        );

        if (Object.keys(req.body).some((key) => !authorizedAttributes.includes(key))) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Provided attributes are not valid or allowed.'
            });
            return;
        }

        if(config.champNameToFillWithTokenId !== undefined){
            req.body[config.champNameToFillWithTokenId] = req.jwt.payload.id;
        }

        const newItem = await config.model.create(req.body);
        res.status(201).json({ message: `New item created in ${config.route}`, item: newItem });
        
    } catch (e: unknown) {
        const attributes = Object.keys(config.model.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return;
        }

        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
    }
}



async function createFunction(req: Request, res: Response, config: CrudAdmin) {
    try {
        const authorizedAttributes = Object.keys(config.model.getAttributes()).filter(
            (attr) => !config.forbidden.includes(attr)
        );

        if (Object.keys(req.body).some((key) => !authorizedAttributes.includes(key))) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Provided attributes are not valid or allowed.'
            });
            return;
        }

        const newItem = await config.model.create(req.body);
        res.status(201).json({ message: `New item created in ${config.route}`, item: newItem });
        
    } catch (e: unknown) {
        const attributes = Object.keys(config.model.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return;
        }

        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
    }
}

export const createRoute = (app: Application, config: CrudAdmin) => {
    app.post(config.route, async (req: Request, res: Response) => {
        createFunction(req, res, config);
    });
};

export const createRouteId = (app: Application, config: CrudAdmin) => {
    app.post(config.route+"id", async (req: Request, res: Response) => {
        if(config.champNameToFillWithTokenId === undefined){
            res.status(500).json({ error: "Error in the server", message: 'You either forgot to change the model or aren t suppose to use this model like this' });
            return;
        }
        createFunctionId(req, res, config);
    });
};
