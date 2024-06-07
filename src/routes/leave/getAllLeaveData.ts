import { Leave,Employe,Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';
import { classByOlder } from '../../utils';

export const pendingLeave = (app: Application) => {
  app.get('/pendingLeaveAllData', async (req: Request, res: Response) => {
    try {
      const responseA = await Leave.findAll({where: {status: "pending"},include: [Employe,Team,EmployeTeam]});
      res.status(200).json(responseA);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}