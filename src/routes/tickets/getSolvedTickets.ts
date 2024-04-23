import { Ticket,ITicket } from '../../models';
import { Model } from 'sequelize';
import { Application, Request, Response } from 'express';

export function classByOlder(tickets: any) {
  return tickets.sort((a:any, b:any) => {
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
}


export const solvedTickets = (app: Application) => {
  app.get('/solvedTickets', async (req: Request, res: Response) => {
    try {
      const sortedTickets = await Ticket.findAll({where: {status: 1}}) as Model<ITicket>[];
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
      const sortedTickets = await Ticket.findAll({where: {status: 0}}) as Model<ITicket>[];
      const tickets = classByOlder(sortedTickets);
      res.status(200).json(tickets);
    } catch (e: unknown) {
      res.status(500).send({ error: "Internal server error" });
    }
  });
}