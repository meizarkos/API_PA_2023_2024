import { Ticket,ITicket } from '../../models';
import { Application, Request, Response } from 'express';

export const solvedTickets = (app: Application) => {
  app.get('/tickets', async (req: Request, res: Response) => {
    try {
      const tickets = await Ticket.findAll({where: {creatorId: req.jwt.payload.id}});
      res.status(200).json(tickets);
    } catch (e: unknown) {
      res.status(500).send({ error: "Internal server error" });
    }
  });
}