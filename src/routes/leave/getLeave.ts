import { Leave } from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../../utils';

export const pendingLeave = (app: Application) => {
  app.get('/pendingLeave', async (req: Request, res: Response) => {
    try {
      const responseA = await Leave.findAll({where: {status: "pending"}});
      const leave = classByOlder(responseA);
      res.status(200).json(leave);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}