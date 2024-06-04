import { User,Company, Employe } from '../../models';
import { Application, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ValidationError,UniqueConstraintError} from 'sequelize';
import { getAllErrors } from '../../utils';
import { Model, ModelStatic } from 'sequelize';

async function register(req:Request,res:Response,model :ModelStatic<Model<any, any>>){
    try {
        const salt = await bcrypt.genSalt(10)
        req.body.password =  await bcrypt.hash(req.body.password,salt)

        // if(req.body.role == "admin"){
        //     return res.status(404).json({message:"No admin creation allow"})
        // }

        await model.create(req.body)

        const valeur = await model.findOne({
            where:{email:req.body.email},
            attributes: { exclude: ['password'] }
        })

        const token = res.jwt({role: valeur.getDataValue('role'), id: valeur.getDataValue('uuid')})
        res.status(200).send({ message: "Créer", token:token.token,id:valeur.getDataValue('uuid') });
    } catch (e: unknown) {
        const attributes = Object.keys(model.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return;
        }

        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: "Error in the server", message: 'Error creating new item.' });
    }
}




export const registerUser = (app: Application) => {
    app.post('/registerUser', async (req: Request, res: Response) => {
        register(req,res,User)
    });
};


export const registerCompany = (app: Application) => {
    app.post('/registerCompany', async (req: Request, res: Response) => {
        register(req,res,Company)
    });
};

export const registerEmploye = (app: Application) => {
    app.post('/registerEmploye', async (req: Request, res: Response) => {
        register(req,res,Employe)
    });
}