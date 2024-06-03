import { Employe,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const getAllEmployeeFromATeam = (app: Application) => {
  app.get('/employeTeam/:teamId', async (req: Request, res: Response) => {
    try {
      const employeTeams = await EmployeTeam.findAll({where:{team_id:req.params.teamId}})
      const employeIds = employeTeams.map(employeTeam => employeTeam.getDataValue('employe_id'));
      const employes = await Employe.findAll({ where: { uuid: employeIds },attributes: { exclude: ['password','rib'] } });
      res.status(200).json(employes);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}