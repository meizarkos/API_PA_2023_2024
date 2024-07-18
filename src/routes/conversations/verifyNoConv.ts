import { Application, Request, Response } from 'express';
import { Conversation} from '../../models';

export const noConvVerifClient = (app: Application) => {
  app.get(`/verifUserNoConv/:annonceId`,async (req: Request, res: Response) => {
    try {
      const firstConvFromUser = await Conversation.findOne({where:{sender_id:req.jwt.payload.id,annonce_id:req.params.annonceId,isFirst:true}});
      if(firstConvFromUser){
        return res.status(201).json({convId:firstConvFromUser.getDataValue("uuid")});
      }
      else{
        return res.status(200).json({convId:"No id found"});
      }
    } catch (e: unknown) {
        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
    }
  });
};