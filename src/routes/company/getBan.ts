import { Company } from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../../utils';

export const banCompanies = (app: Application) => {
  app.get('/banCompanies', async (req: Request, res: Response) => {
    try {
      const responseA = await Company.findAll({where: {role:"ban"}});
      const companies = classByOlder(responseA);
      res.status(200).json(companies);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}