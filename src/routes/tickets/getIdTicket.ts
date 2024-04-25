import { Ticket } from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../../utils';

export const solvedTicketsId = (app: Application) => {
  app.get('/tickets', async (req: Request, res: Response) => {
    try {
      const tickets1 = await Ticket.findAll({where: {creatorId: req.jwt.payload.id}});
      const tickets = classByOlder(tickets1)
      res.status(200).json(tickets);
    } catch (e: unknown) {
      res.status(500).send({ error: "Internal server error" });
    }
  });
}