import { User } from '../../models';
import { Application, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const loginAdmin = (app: Application) => {
    app.post('/loginAdmin', async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await User.findOne({where:{ email }});

            if (!user) {
                res.status(400).send({ message: "Wrong credentials" });
                return;
            }

            if(user && user.getDataValue('role')==="admin"){
              if (!user || !(await bcrypt.compare(password, user.getDataValue('password')))) {
                return res.status(401).json({ message: "Wrong credentials" });
              }
            }

            const token = res.jwt({role: user.getDataValue('role'), id: user.getDataValue('uuid')})
            res.status(200).send({ message: "Connecté", token:token.token });
        } catch (e: unknown) {
            res.status(500).send({ error: "Internal server error"});
        }
    });
};
