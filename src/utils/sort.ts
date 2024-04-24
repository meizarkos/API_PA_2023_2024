import { Model } from "sequelize";

export const classByOlder = (tickets: Model<any,any>[] | null) =>{
    if(tickets.length===0) return [];
    return tickets.sort((a, b) => {
      return a.getDataValue('createdAt').getTime() - b.getDataValue('createdAt').getTime();
    });
}