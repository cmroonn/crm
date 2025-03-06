import { Schedule } from '../../db/models/schedule.entity.js';
import { Op } from 'sequelize';
// import AppError from '../errors/AppError.js'
// import FileService from '../services/File.js'

class ScheduleModel {
    async getAll(data) {
        const schedule = await Schedule.findAll({
            where: {
                [Op.or]: data.dates, 
            }
        })
        return schedule
    }

    // @data: Array
    // upd save accounts 
    async saveData(data) {
        console.log(data)
        const response = await Schedule.bulkCreate(data);
        return response;
    }

    async updateData(data) {
        console.log(data)
        data.forEach(async (el) => {
            const row = await Schedule.findOne({
                where: {
                    date: el.date,
                }
            })

            row.start = el.start;
            row.end = el.end;
            await row.save();
        })

        return true;
    }
}

export default new ScheduleModel()