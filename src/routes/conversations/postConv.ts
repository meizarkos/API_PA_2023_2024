import { Application, Request, Response } from 'express';
import { Conversation} from '../../models';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { getAllErrors } from '../../utils';


async function createConv(route:String,app: Application){
  app.post(`${route}/:firstConvUuid/:annonceId`,async (req: Request, res: Response) => {
    try {
      let firstConv = Conversation.findOne({where:{uuid:req.params.firstConvUuid}});
      req.body.annonce_id = req.params.annonceId;
      req.body.first_conv_id = req.params.firstConvUuid;
      req.body.sender_id = req.jwt.payload.id;
      const firstConvSenderId = (await firstConv).getDataValue("sender_id");
      if(firstConvSenderId == req.jwt.payload.id){ //if send by a user
        req.body.target_id = (await firstConv).getDataValue("target_id");
      }
      else{
        req.body.target_id = (await firstConv).getDataValue("sender_id");
      }
      const newItem = await Conversation.create(req.body);
      res.status(201).json({ message: `New item created`, item: newItem });

    } catch (e: unknown) {

        const attributes = Object.keys(Conversation.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return;
        }

        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
    }
  });
}

export const createConvClient = (app: Application) => {
  createConv("/postConv",app)
};