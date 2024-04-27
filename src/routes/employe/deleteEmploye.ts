import { Employe,EmployeTeam } from '../../models';
import { Application, Request, Response } from 'express';

export const deleteEmploye = (app: Application) => {
  app.delete('/teamEmploye/:employeId', async (req: Request, res: Response) => {
    try {
      await Employe.destroy({where:{uuid:req.params.employeId}})
      await EmployeTeam.destroy({where:{employeId:req.params.employeId}})
      res.status(200).json({message:"Item delete with success"});
    } catch (e: unknown) {
      console.log(e)
      res.status(500).send({ error: "Internal server error" });
    }
  });
}