import { Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const getAllTeamFromAnEmploye = (app: Application) => {
  app.get('/teamEmploye/:employeId', async (req: Request, res: Response) => {
    try {
      const employeTeams = await EmployeTeam.findAll({where:{employe_id:req.params.employeId}})
      const teamIds = employeTeams.map(employeTeam => employeTeam.getDataValue('teamId'));
      const teams = await Team.findAll({ where: { uuid: teamIds }});
      res.status(200).json(teams);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}