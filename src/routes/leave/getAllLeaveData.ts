import { Leave,Employe,Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';


export const pendingLeaveAllData = (app: Application) => {
  app.get('/pendingLeaveAllData', async (req: Request, res: Response) => {
    try {
      const responseA = await Leave.findAll({where: {status: "pending"}});
      const responseB = await Promise.all(responseA.map(async (leave) => {
        const employe = await Employe.findOne({where: {uuid: leave.getDataValue('id_employe')}, attributes: {exclude: ['password']}})
        const team = await EmployeTeam.findAll({where: {employe_id: employe.getDataValue('uuid')}, include: [Team]});
        return {leave, employe, team};
      }))
      res.status(200).json(responseB);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}