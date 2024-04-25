import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { Identifier } from 'sequelize';
import jwt from 'jwt-express'

async function deleteFunc(res:Response,req:Request,config:CrudAdmin,id:Identifier){
    try {
        const item = await config.model.findByPk(id);

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return;
        }

        await config.model.destroy({ where: { uuid: id } });
        res.status(200).json({ message: `Item deleted from ${config.route}` });
    } catch (e: unknown) {
        console.error(e);
        res.status(500).json({ error: "Error in the server", message: 'Error deleting item.' });
    }
}

export const deleteRoute = (app: Application, config: CrudAdmin) => {
    app.delete(`${config.route}/:uuid`, async (req: Request, res: Response) => {
        deleteFunc(res,req,config,req.params.uuid)
    });
};


export const deleteRouteActuel = (app: Application, config: CrudAdmin) => {
    app.delete(`${config.route}Actuel`, jwt.active(),async (req: Request, res: Response) => {
        deleteFunc(res,req,config,req.jwt.payload.id)
    });
};
