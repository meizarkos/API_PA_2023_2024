import { Ticket } from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../../utils';


export const solvedTickets = (app: Application) => {
  app.get('/solvedTickets', async (req: Request, res: Response) => {
    try {
      const sortedTickets = await Ticket.findAll({where: {status: 1}});
      const tickets = classByOlder(sortedTickets);
      res.status(200).json(tickets);
    } catch (e: unknown) {
      res.status(500).send({ error: "Internal server error" });
    }
  });
}

export const unsolvedTickets = (app: Application) => {
  app.get('/unsolvedTickets', async (req: Request, res: Response) => {
    try {
      const sortedTickets = await Ticket.findAll({where: {status: 0}});
      const tickets = classByOlder(sortedTickets);
      res.status(200).json(tickets);
    } catch (e: unknown) {
      res.status(500).send({ error: "Internal server error" });
    }
  });
}