import { Company,Ticket,Leave, Employe } from '../../models';
import { Application, Request, Response } from 'express';

export const allAdminData = (app: Application) => {
  app.get('/allAdminData', async (req: Request, res: Response) => {
    try {
      const companies = await Company.findAll({where: {role: "ban"},attributes: { exclude: ["password"] }});
      const employes = await Employe.findAll();
      const tickets = await Ticket.findAll({where: {status: 0}});
      const leaves = await Leave.findAll({where: {status: "pending"}});
      res.status(200).json({companyNumber: companies.length, employeNumber: employes.length, ticketNumber: tickets.length, leaveNumber: leaves.length});
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}