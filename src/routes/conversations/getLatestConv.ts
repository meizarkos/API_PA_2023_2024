import { Application, Request, Response } from 'express';
import { Conversation} from '../../models';
import { classByOlder } from '../../utils';

async function getFirstConvFunction(isUser:Boolean,route:String,app: Application){
  app.get(`${route}`,async (req: Request, res: Response) => {
      try {
        var newItem;
        if(isUser){
          newItem = await Conversation.findAll({where:{sender_id:req.jwt.payload.id,isFirst:true}});
        }
        else{
          newItem = await Conversation.findAll({where:{target_id:req.jwt.payload.id,isFirst:true}});
        }
        return res.status(200).json(newItem);
      } catch (e: unknown) {
          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
      }
  });
}

export const getFirstConv = (app: Application) => {
  getFirstConvFunction(true,"/getFirstConvClient",app);
};

export const getFirstConvCompany = (app: Application) => {
  getFirstConvFunction(false,"/getFirstConvCompany",app);
}