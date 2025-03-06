import ScheduleModel from '../models/Schedule.js';
class Schedule {
    async getAll(req, res, next) {
        try {
            console.log(req.fields);
            const sources = await ScheduleModel.getAll(req.fields);
            res.json(sources);
        }
        catch (e) {
            console.log(e);
        }
    }
    async saveData(req, res, next) {
        try {
            console.log(req.fields);
            const response = await ScheduleModel.saveData(req.fields.data);
            res.json(response);
        }
        catch (e) {
            console.log(e);
        }
    }
    async updateData(req, res, next) {
        try {
            console.log(req.fields);
            const response = await ScheduleModel.updateData(req.fields.data);
            res.json(response);
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default new Schedule();
