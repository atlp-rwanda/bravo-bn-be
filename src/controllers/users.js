import db from '../database/models/index.js';
const User = db['users']
export const getAll = async (req, res, next) =>{
    try {
        const all = await User.findAll();
        return res.status(200).json(all);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
