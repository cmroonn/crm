import AccountsModel from '../models/Accounts.js';
class Accounts {
    async getAll(req, res, next) {
        try {
            const sources = await AccountsModel.getAll(req.params.employee_id);
            res.json(sources);
            console.log('aaa');
        }
        catch (e) {
            console.log(e);
        }
    }
    async saveData(req, res, next) {
        try {
            console.log(req.fields);
            const response = await AccountsModel.saveData(req.fields);
            res.json(response);
            console.log(res.json(response));
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default new Accounts();
