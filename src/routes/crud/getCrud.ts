import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';

export const getAllRoute = (app: Application, config: CrudAdmin) => {
    app.get(config.route, async (req: Request, res: Response) => {
        try {
            const items = await config.model.findAll(
                config.noReturn ? { attributes: { exclude: config.noReturn } } : {}
            );

            if (!items) {
                res.status(404).json({ message: `No items found in ${config.route}` });
                return;
            }

            res.status(200).json({ message: `All items in ${config.route}`, items });
        } catch (e: unknown) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: `Error fetching items from ${config.route}`
            });
        }
    });
};

export const getRoute = (app: Application, config: CrudAdmin) => {
    app.get(`${config.route}/:uuid`, async (req: Request, res: Response) => {
        try {
            const item = await config.model.findByPk(req.params.uuid);

            if (!item) {
                res.status(404).json({ message: `Item not found in ${config.route}` });
                return;
            }

            res.status(200).json({ message: `Item found in ${config.route}`, item });
        } catch (e: unknown) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: `Error fetching item from ${config.route}`
            });
        }
    });
};

export const getByIdInToken = (app: Application, config: CrudAdmin) => {
    app.get(`${config.route}token`, async (req: Request, res: Response) => {
        try {
            if(!req.jwt.payload){
                res.status(401).json({ message: `Token not found in ${config.route}token` });
                return;
            }

            if(config.champNameToFindById == null){
                res.status(500).json({
                    error: 'Internal Server Error',
                    message: `You forgot to modify the model to add champNameToFindById`
                });
                return;
            }

            const champAsPrimaryKey = config.champNameToFindById;

            const whereClause = {};
            whereClause[champAsPrimaryKey] = req.jwt.payload.id;

            const item = await config.model.findAll({where:whereClause});

            if (!item) {
                res.status(404).json({ message: `Item not found in ${config.route}` });
                return;
            }

            res.status(200).json({ message: `Item found in ${config.route}`, item });
        } catch (e: unknown) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: `Error fetching item from ${config.route}`
            });
        }
    });
}
