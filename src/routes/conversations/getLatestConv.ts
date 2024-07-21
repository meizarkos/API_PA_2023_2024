import { Application, Request, Response } from 'express';
import { Annonce, Conversation} from '../../models';
import { classByOlder } from '../../utils';

async function getFirstConvFunction(isUser:Boolean,route:String,app: Application){
  app.get(`${route}`,async (req: Request, res: Response) => {
      try {
        let allFirstConv;
        if(isUser){
          allFirstConv = await Conversation.findAll({where:{sender_id:req.jwt.payload.id,isFirst:true}});
        }
        else{
          allFirstConv = await Conversation.findAll({where:{target_id:req.jwt.payload.id,isFirst:true}});
        }
        const latestConv = await Promise.all(allFirstConv.map(async (conv) => {
            const annonce = await Annonce.findOne({where:{uuid:conv.getDataValue("annonce_id")}});
            if(annonce == null){
              return
            }
            const allConvFromOne = await Conversation.findAll({where:{first_conv_id:conv.getDataValue("uuid")}});
            if(allConvFromOne.length == 0){
              let convWithFrom = {...conv.dataValues};
              if(isUser){
                convWithFrom.from = "You";
              }
              else{
                convWithFrom.from = "Not you";
              }
              return {annonce:annonce,conversation:convWithFrom}
            }
            const allConvByOlder = classByOlder(allConvFromOne);
            const latestConversation = allConvByOlder[allConvByOlder.length-1];

            let fromValue;
            if (latestConversation.getDataValue("sender_id") == req.jwt.payload.id && isUser) {
                fromValue = "You";
            } else if (latestConversation.getDataValue("sender_id") != req.jwt.payload.id && isUser) {
                fromValue = "Not you";
            } else if (latestConversation.getDataValue("sender_id") == req.jwt.payload.id && !isUser) {
                fromValue = "You";
            } else if (latestConversation.getDataValue("sender_id") != req.jwt.payload.id && !isUser) {
                fromValue = "Not you";
            }

            let latestConvWithFrom = { ...latestConversation.dataValues, from: fromValue };

            console.log({annonce:annonce,conversation:latestConvWithFrom});

            return {annonce:annonce,conversation:latestConvWithFrom};
          })); 

        console.log({latestConv:latestConv});  
        return res.status(200).json({latestConv : latestConv});
      } catch (e: unknown) {
          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
      }
  });
}

export const getFirstConv = (app: Application) => {
  getFirstConvFunction(true,"/getFirstConvUser",app);
};

export const getFirstConvCompany = (app: Application) => {
  getFirstConvFunction(false,"/getFirstConvCompany",app);
}