import { Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';
import { team } from '../../models/crud';

export const getTeam = (app: Application) => {
  app.get('/employeTeam', async (req: Request, res: Response) => {
    try {
      const teams = await Team.findAll();
      const teamsFinal = await Promise.all(teams.map(async team => {
        const employeTeams = await EmployeTeam.findAll({where:{teamId:team.getDataValue('uuid')}});
        const number = employeTeams.length;
        const teamData = team.get();
        return {
          ...teamData,
          numberEmploye:number
        }
      }));
      res.status(200).json(teamsFinal);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}