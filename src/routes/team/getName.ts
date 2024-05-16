import { Team } from '../../models';
import { Application, Request, Response } from 'express';

export const getIfNameIsOk = (app: Application) => {
  app.get('/teamName/:teamName', async (req: Request, res: Response) => {
    try {
      const teamName = req.params.teamName;
      const teams = await Team.findOne({where:{team_name:teamName}});
      if(teams){
        res.status(200).json({message:"Name is already taken"});
      }
      else{
        res.status(200).json({message:"Name is available"});
      }
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}