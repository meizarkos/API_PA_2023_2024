import { Application, Request, Response } from 'express';
import { Annonce, Offer, User } from '../../models';
import { offer } from '../../models/crud';

async function getOfferBasedOnStatusUser(app:Application,status:String,route:String){
  app.get(`${route}`, async (req: Request, res: Response) => {
      try {
          const offerWithStatus = await Offer.findAll({where:{status:status}});

          const offerWithStatusFromCompany = await Promise.all(offerWithStatus.map(async (offer) => {
              const user = await User.findOne({where:{uuid:offer.getDataValue('user_id')}});
              const annonces = await Annonce.findOne({where:{uuid:offer.getDataValue('annonce_id')}});
            
              if(user.getDataValue('uuid') === req.jwt.payload.id){
                  return {offer:offer, user:user , annonce:annonces};
              }
          }));
          res.status(200).json({offers : offerWithStatusFromCompany});
      } catch (e: unknown) {
          console.error(e); // Log the error for server-side inspection
          res.status(500).json({ error: "Error in the server", message: 'Error getting items.' });
      }
  });
}

export const getOfferUserPending = (app: Application) => {
  getOfferBasedOnStatusUser(app,"pending","/getOfferUserPending");
};

export const getOfferUserAccepted = (app: Application) => {
  getOfferBasedOnStatusUser(app,"accepted","/getOfferUserAccepted");
};

export const getOfferUserRefused = (app: Application) => {
  getOfferBasedOnStatusUser(app,"refused","/getOfferUserRefused");
};