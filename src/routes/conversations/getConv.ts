import { Application, Request, Response } from 'express';
import { Annonce, Conversation} from '../../models';
import { classByOlder } from '../../utils';

export const getConv = (app: Application) => {
  app.get("/getConv/:convId",async (req: Request, res: Response) => {
      try {
          const annonce = await Annonce.findOne({where:{uuid:req.params.annonceId}});
          let newItemRes = []
          const oneConv = await Conversation.findOne({where:{uuid:req.params.convId}});
          const allConv = await Conversation.findAll({where:{first_conv_id:req.params.convId}});
          newItemRes.push(oneConv);
          newItemRes = newItemRes.concat(allConv);
          const newItemByOlder = classByOlder(newItemRes);

          const convWithFrom = Promise.all(newItemByOlder.map(async (conv) => {
                let fromValue;
                if (conv.getDataValue("sender_id") == req.jwt.payload.id) {
                    fromValue = "You";
                } else {
                    fromValue = "Not you";
                }
                let convWithFromPromise = { ...conv.dataValues, from: fromValue };
                return convWithFromPromise;
          }));


          res.status(200).json({annonce:annonce,conversations : convWithFrom});
      } catch (e: unknown) {
          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
      }
  });
};