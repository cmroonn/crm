import { Source } from '../../db/models/source.entity.js';
import { Account } from '../../db/models/accounts.entity.js';
class SourceModel {
    async getAll() {
        const sources = await Source.findAll();
        return sources;
    }
    async saveData(data) {
        console.log(data);
        await Account.destroy({
            where: {
                employee_id: data.resourceId
            }
        });
        const newData = data.values.map(el => {
            return {
                login: el.login,
                password: el.password,
                source_id: el.source.value,
                employee_id: el.employee_id
            };
        });
        console.log(newData);
        const response = await Account.bulkCreate(newData);
        return response;
    }
}
export default new SourceModel();
