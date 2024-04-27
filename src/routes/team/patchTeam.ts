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
        await EmployeTeam.destroy({where:{teamId:req.params.teamId,employeId:idsToDelete}});
      }
      if(ids.length > 0){
        ids.forEach(async id => {
          await EmployeTeam.create({teamId:req.params.teamId,employeId:id})
        });
      }
      
      res.status(200).json({message:"Item delete with success"});
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}