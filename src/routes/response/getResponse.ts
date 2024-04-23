import { Response as ResponseModel} from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../tickets';

export const get_response_of_a_ticket= (app: Application) => {
  app.get('/response/:ticketId', async (req: Request, res: Response) => {
    try {
      const responseA = await ResponseModel.findAll({where: {creatorId: req.jwt.payload.id, ticketId: req.params.ticketId}});
      const response = classByOlder(responseA);
      res.status(200).json(response);
    } catch (e: unknown) {
      res.status(500).send({ error: "Internal server error" });
    }
  });
}