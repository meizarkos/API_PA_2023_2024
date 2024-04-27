import { Team,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const deleteTeam = (app: Application) => {
  app.delete('/employeTeam/:teamId', async (req: Request, res: Response) => {
    try {
      await Team.destroy({where:{uuid:req.params.teamId}})
      await EmployeTeam.destroy({where:{employeId:req.params.teamId}})
      res.status(200).json({message:"Item delete with success"});
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}