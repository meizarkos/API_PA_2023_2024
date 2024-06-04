import { Application, Request, Response } from 'express';
import { Ticket } from '../../models';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { getAllErrors } from '../../utils';

export const createRoute = (app: Application) => {
  app.post("/postTicket", async (req: Request, res: Response) => {
      try {
          req.body.creator_id = req.jwt.payload.id;
          const newItem = await Ticket.create(req.body);
          res.status(201).json({ message: `New item created`, item: newItem });
      } catch (e: unknown) {
          const attributes = Object.keys(Ticket.getAttributes());

          if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
              getAllErrors(e, res, attributes);
              return;
          }

          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
      }
  });
};