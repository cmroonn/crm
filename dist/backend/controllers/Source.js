import SourceModel from '../models/Source.js';
class Source {
    async getAll(req, res, next) {
        try {
            const sources = await SourceModel.getAll();
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
            const response = await SourceModel.saveData(req.fields);
            res.json(response);
            console.log(res.json(response));
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default new Source();
