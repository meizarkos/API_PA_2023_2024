import { Employe, EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const get_all_employe_with_a_status = (app: Application) => {
  app.get('/statusTeam/:teamId', async (req: Request, res: Response) => {
    try {
      const employeTeams = await Employe.findAll()
      const employe = await Promise.all(employeTeams.map(async employe =>{
        const uuid = employe.getDataValue('uuid');
        const dataValue = employe.get();
        const isInTheTeam = await EmployeTeam.findOne({where:{employe_id:uuid,team_id:req.params.teamId}})
        if(isInTheTeam){
          return {...dataValue, is_in_the_team:"true"}
        }
        else{
          return {...dataValue, is_in_the_team:"false"}
        }
      }));
      res.status(200).json(employe);
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}