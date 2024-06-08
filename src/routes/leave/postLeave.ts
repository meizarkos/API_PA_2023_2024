import { Application, Request, Response } from 'express';
import { Leave } from '../../models';
import { getAllErrors } from '../../utils';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export const createRoute = (app: Application) => {
    app.post('/postLeave', async (req: Request, res: Response) => {
        try {
            req.body["id_employe"] = req.jwt.payload.id;
            const newItem = await Leave.create(req.body);
            res.status(201).json({ message: `New item created in leavePost`, item: newItem });
            
        } catch (e: unknown) {
            const attributes = Object.keys(Leave.getAttributes());

            if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
                getAllErrors(e, res, attributes);
                return;
            }

            console.error(e); // Log the error for server-side inspection
            res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
        }
    });
};