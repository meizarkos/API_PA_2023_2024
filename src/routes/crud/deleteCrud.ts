import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';

export const deleteRoute = (app: Application, config: CrudAdmin) => {
    app.delete(`${config.route}/:uuid`, async (req: Request, res: Response) => {
        try {
            const item = await config.model.findByPk(req.params.uuid);

            if (!item) {
                res.status(404).json({ message: `Item not found in ${config.route}` });
                return;
            }

            await config.model.destroy({ where: { uuid: req.params.uuid } });
            res.status(200).json({ message: `Item deleted from ${config.route}` });
        } catch (e: unknown) {
            console.error(e);
            res.status(500).json({ error: "Error in the server", message: 'Error deleting item.' });
        }
    });
};
