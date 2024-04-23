import { User,IUser } from '../../models';
import { Application, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const login = (app: Application) => {
    app.post('/loginAdmin', async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await User.findOne({where:{ email }});

            if (!user) {
                res.status(400).send({ message: "Wrong credentials" });
                return;
            }

            if(user && user.role==="admin"){
              if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
              }
            }

            const token = res.jwt({role: user.role, id: user.uuid})
            res.status(200).send({ message: "Connecté", token });
        } catch (e: unknown) {
            res.status(500).send({ error: "Internal server error"});
        }
    });
};
