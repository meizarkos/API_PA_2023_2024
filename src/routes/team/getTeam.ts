import { Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const getTeam = (app: Application) => {
  app.get('/employeTeamNumber', async (req: Request, res: Response) => {
    try {
      const teams = await Team.findAll();
      const teamsFinal = await Promise.all(teams.map(async team => {
        const employeTeams = await EmployeTeam.findAll({where:{teamId:team.getDataValue('uuid')}});
        const number_of_employe = employeTeams.length;
        const teamData = team.get();
        return {
          ...teamData,
          number_of_employe
        }
      }));
      res.status(200).json(teamsFinal);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}