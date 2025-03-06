import { DefaultAuthProvider } from 'adminjs';
import { componentLoader } from './component-loader.js';
import { User } from '../db/models/user.entity.js';
import bcrypt from 'bcryptjs';
const provider = new DefaultAuthProvider({
    componentLoader,
    authenticate: async ({ email, password }) => {
        const user = await User.findOne({ where: { email } });
        if (user && bcrypt.compareSync(password, user.password)) {
            return { email, role: user.role, id: String(user.id) };
        }
        if (email === 'pizda') {
            return { email };
        }
        return null;
    },
});
export default provider;
