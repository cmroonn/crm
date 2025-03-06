import { Reports } from '../../db/models/reports.entity.js';
import { Schedule } from '../../db/models/schedule.entity.js';
import { Income } from '../../db/models/income.entity.js';
import { Op } from 'sequelize';
class ReportsModel {
    async getAll(data) {
        const schedule = await Reports.findAll({
            where: {
                [Op.or]: data.dates,
            }
        });
        return schedule;
    }
    async saveData(data) {
        console.log(data);
        const response = await Reports.bulkCreate(data);
        return response;
    }
    async updateData(data) {
        console.log(data);
        data.forEach(async (el) => {
            const row = await Reports.findOne({
                where: {
                    shiftId: el.shiftId,
                }
            });
            row.endTime = el.endTime;
            await row.save();
            const schedule = await Schedule.findOne({
                where: {
                    id: el.shiftId,
                }
            });
            schedule.isFinished = true;
            await schedule.save();
            el.sources.forEach(async (source) => {
                try {
                    await Income.create({
                        source: source.label,
                        value: source.inputValue,
                        reportId: row.id,
                    });
                }
                catch (e) {
                    console.log(e);
                }
            });
        });
        return true;
    }
}
export default new ReportsModel();
