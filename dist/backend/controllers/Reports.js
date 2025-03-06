import ReportsModel from '../models/Reports.js';
class Reports {
    async getAll(req, res, next) {
        try {
            console.log(req.fields);
            const sources = await ReportsModel.getAll(req.fields);
            res.json(sources);
        }
        catch (e) {
            console.log(e);
        }
    }
    async saveData(req, res, next) {
        try {
            console.log(req.fields);
            const response = await ReportsModel.saveData(req.fields.data);
            res.json(response);
        }
        catch (e) {
            console.log(e);
        }
    }
    async updateData(req, res, next) {
        try {
            console.log(req.fields);
            const response = await ReportsModel.updateData(req.fields.data);
            res.json(response);
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default new Reports();
