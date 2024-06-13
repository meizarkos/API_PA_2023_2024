import { Employe,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const addAndDeleteToATeam = (app: Application) => {
  app.post('/employeTeam/:teamId', async (req: Request, res: Response) => {
    try {
      const idsString = req.query.ids as string;
      const ids = idsString.split(',')
      const idsDeletedString = req.query.idsDelete as string;
      const idsToDelete = idsDeletedString.split(',')
      if(idsToDelete.length > 0){
        await EmployeTeam.destroy({where:{team_id:req.params.teamId,employe_id:idsToDelete}});
      }
      if(ids.length > 0){
        ids.forEach(async id => {
          if(id == "") return
          if(await Employe.findOne({where:{uuid:id}}) === null){
            await EmployeTeam.create({team_id:req.params.teamId,employe_id:id})
          }
        });
      }
      
      res.status(200).json({message:"Item delete with success"});
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}