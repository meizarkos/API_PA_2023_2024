import { Application, Request, Response } from 'express';
import { Conversation} from '../../models';
import { classByOlder } from '../../utils';

export const getConv = (app: Application) => {
  app.get("/getConv/:convId",async (req: Request, res: Response) => {
      try {
          const newItem = await Conversation.findAll({where:{first_conv_id:req.params.convId}});
          const newItemByOlder = classByOlder(newItem);
          res.status(200).json(newItemByOlder);
      } catch (e: unknown) {
          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
      }
  });
};