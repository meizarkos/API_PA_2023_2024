import { Application, Request, Response } from 'express';
import { Annonce, Offer,User } from '../../models';


async function getOfferBasedOnStatus(app:Application,status:String,route:String){
    app.get(`${route}`, async (req: Request, res: Response) => {
        try {
            const offerWithStatus = await Offer.findAll({where:{status:status}});

            const offerWithStatusFromUser = await Promise.all(offerWithStatus.map(async (offer) => {
                const annonceId = await offer.getDataValue('annonce_id');
                const userId = await offer.getDataValue('user_id');
                const annonce = await Annonce.findOne({where:{uuid:annonceId}});
                const user = await User.findOne({where:{uuid:userId}});
                const companyId = await annonce.getDataValue('company_id');
                if(companyId === req.jwt.payload.id){
                    return {offer:offer, user:user , annonce:annonce};
                }
            }));
            res.status(200).json({offers : offerWithStatusFromUser});
        } catch (e: unknown) {
            console.error(e); // Log the error for server-side inspection
            res.status(500).json({ error: "Error in the server", message: 'Error getting items.' });
        }
    });
    
}

export const getOfferCompanyPending = (app: Application) => {
    getOfferBasedOnStatus(app,"pending","/getOfferCompanyPending");
};

export const getOfferCompanyAccepted = (app: Application) => {
    getOfferBasedOnStatus(app,"accepted","/getOfferCompanyAccepted");
};

export const getOfferCompanyRefused = (app: Application) => {
    getOfferBasedOnStatus(app,"refused","/getOfferCompanyRefused");
};