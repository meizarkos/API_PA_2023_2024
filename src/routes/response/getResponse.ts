import { Response as ResponseModel} from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../../utils';

export const get_response_of_a_ticket= (app: Application) => {
  app.get('/responseTicket/:ticketId', async (req: Request, res: Response) => {
    try {
      const responseA = await ResponseModel.findAll({where: {ticket_id: req.params.ticketId}});
      const response = classByOlder(responseA);
      res.status(200).json(response);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}