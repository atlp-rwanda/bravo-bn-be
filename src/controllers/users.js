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

const updateUser = (user, userInfo) => User.update(userInfo, {
    where: user,
    returning: true
  });

export const updateRole = (req, res, next) => {
    const email = req.body.email;
    const role = req.body.role;

    	User.findOne({ where: { email: email } }).then(user => {
        console.log(user)
        if(user === null){
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'super admin') {
           return res.status(403).json({message: "Super admin can not be updated"})
        }
        updateUser({ email: email }, { role: role })
       
        return res.status(200).json({result: "user role updated"})
    })
      .catch((error) => res.status(404).json({ error }));
    
}
