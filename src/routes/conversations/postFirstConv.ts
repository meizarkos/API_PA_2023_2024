import { Application, Request, Response } from 'express';
import { Annonce, Conversation} from '../../models';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { getAllErrors } from '../../utils';

export const createFirstConv = (app: Application) => {
  app.post("/postFirstConvClient/:annonceId",async (req: Request, res: Response) => {
      try {
          const targetId = (await Annonce.findOne({where:{uuid:req.params.annonceId}})).getDataValue("company_id");
          req.body.annonce_id = req.params.annonceId;
          req.body.first_conv_id = null;
          req.body.isFirst = true;
          req.body.sender_id = req.jwt.payload.id;
          req.body.target_id = targetId;
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
};