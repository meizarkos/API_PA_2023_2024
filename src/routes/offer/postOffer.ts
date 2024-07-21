import { Application, Request, Response } from 'express';
import { Offer } from '../../models';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { getAllErrors } from '../../utils';

export const createFirstConv = (app: Application) => {
  app.post("/postOffer",async (req: Request, res: Response) => {
      try {
          const newItem = await Offer.create(req.body);
          res.status(201).json({ message: `New item created`, item: newItem });
      } catch (e: unknown) {
          const attributes = Object.keys(Offer.getAttributes());

          if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
              getAllErrors(e, res, attributes);
              return;
          }

          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
      }
  });
};