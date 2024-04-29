import { Company, Employe, User } from '../../models';
import { Application, Request, Response } from 'express';
import { Model, ModelStatic } from 'sequelize';
import bcrypt from 'bcrypt';


async function login(req:Request,res:Response,model :ModelStatic<Model<any, any>> ){
        const email = req.body.email;
        const password = req.body.password;
        try {
            const valeur = await model.findOne({where:{ email }});

            if (!valeur) {
                res.status(400).send({ message: "Wrong credentials" });
                return;
            }

            if (!valeur || !(await bcrypt.compare(password, valeur.getDataValue('password')))) {
                return res.status(401).json({ message: "Wrong credentials" });
            }

            const token = res.jwt({role: valeur.getDataValue('role'), id: valeur.getDataValue('uuid')})
            res.status(200).send({ message: "Connecté", token:token.token });
        } catch (e: unknown) {
            res.status(500).send({ error: "Internal server error"});
        }
}

export const loginUser = (app: Application) => {
    app.post('/loginUser', async (req: Request, res: Response) => {
        login(req,res,User)
    });
};

export const loginCompany = (app: Application) => {
    app.post('/loginCompany', async (req: Request, res: Response) => {
        login(req,res,Company)
    });
};

export const loginEmploye = (app: Application) => {
    app.post('/loginEmploye', async (req: Request, res: Response) => {
        login(req,res,Employe)
    });
}
