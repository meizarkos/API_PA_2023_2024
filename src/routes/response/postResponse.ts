import { Response as ResponseModel} from '../../models';
import { Application, Request, Response } from 'express';

export const postATicket= (app: Application) => {
  app.post('/responseAdmin/:ticketId', async (req: Request, res: Response) => {
    try {
      req.body.ticket_id = req.params.ticketId;
      req.body.creator_id = req.jwt.payload.id;
      await ResponseModel.create(req.body);
      res.status(200).json({ message: "Response created" });
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}