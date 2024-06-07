import { Leave,Employe,Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';
import { team, employe } from '../../models/crud';


export const pendingLeaveAllData = (app: Application) => {
  app.get('/pendingLeaveAllData', async (req: Request, res: Response) => {
    try {
      const responseA = await Leave.findAll({where: {status: "pending"}});
      const responseB = await Promise.all(responseA.map(async (leave) => {
        const employe = await Employe.findOne({where: {uuid: leave.getDataValue('id_employe')}});
        const Employeteam = await EmployeTeam.findOne({where: {employe_id: employe.getDataValue('uuid')}});
        const team = await Team.findAll({where: {uuid: Employeteam.getDataValue('team_id')}});
        return {leave, employe, team};
      }))
      res.status(200).json(responseB);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}