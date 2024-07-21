import { Application, Request, Response } from 'express';
import { Annonce, Company, Offer } from '../../models';


async function getOfferBasedOnStatus(app:Application,status:String,route:String){
    app.get(`${route}`, async (req: Request, res: Response) => {
        try {
            const offerWithStatus = await Offer.findAll({where:{status:status}});

            const offerWithStatusFromCompany = await Promise.all(offerWithStatus.map(async (offer) => {
                const annonceId = await offer.getDataValue('annonce_id');
                console.log(annonceId);
                const annonce = await Annonce.findOne({where:{uuid:annonceId}});
                const companyId = await annonce.getDataValue('company_id');
                const company = await Company.findOne({where:{uuid:companyId}});
                if(companyId === req.jwt.payload.id){
                    return {offer:offer, company:company , annonce:annonce};
                }
            }));
            res.status(200).json({offers : offerWithStatusFromCompany});
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