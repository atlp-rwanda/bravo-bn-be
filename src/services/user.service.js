import db from '../database/models/index.js'
const users = db['users']

export const getAllUsers = async (req, res) => {
 
	// try{
	// 		users.findAndCountAll().then(users => {
				
	// 			return res.status(200).json({
	// 				status:true,
	// 				data:users,
	// 				message:"Retrieved"});
	// 		})		
	// }
	// catch(error) {
	// 	return res.status(500).json(error.message);
	console.log(req.user.dataValues)
	// }	
};
export const createUser = async (req, res) => {
    try {
	
		if(!req.body.username && !req.body.password &&  !req.body.fullname){			
			throw new Error('Body is required');	
				
		}
		if(!req.body.password || req.body.password.trim() === ""){
			return fail(res,400,req.body,"Please make sure you add password"); 
		}
		const newUser = users.create(req.body);
		const {fullname,username,email,role,password} = req.body;
		return res.status(201).json({
			status:true,
			data:{fullname,username,email,role,password},
			message:"New user have been created"});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};


