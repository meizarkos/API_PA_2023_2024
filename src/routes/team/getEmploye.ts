import { Employe,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const getAllEmployeeFromATeam = (app: Application) => {
  app.get('/employeTeam/:teamId', async (req: Request, res: Response) => {
    try {
      const employeTeams = await EmployeTeam.findAll({where:{teamId:req.params.teamId}})
      const employeIds = employeTeams.map(employeTeam => employeTeam.getDataValue('employeId'));
      const employes = await Employe.findAll({ where: { uuid: employeIds } });
      res.status(200).json(employes);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}