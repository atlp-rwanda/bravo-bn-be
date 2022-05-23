import users from "../models/users.js";

export const getAllUsers = async (req, res) => {
 
	try{
		/* ======= Start:: List all users with count ========== */ 
			// users.findAll().then(users => {
			// 	return success(res,200,users,"Retrieved");
			// })
		/* ======= End:: List all users with count ============ */ 
	
		/* ======= Start:: List all users =================== */ 
			users.findAndCountAll().then(users => {
				
				return res.status(200).json({
					status:"success",
					data:users,
					message:"Retrieved"});
			})
		/* ========= End:: List all users ================== */ 
	}
	catch(error) {
		return res.status(500).json(error.message);
	}
	
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
			status:"success",
			data:{fullname,username,email,role,password},
			message:"New user have been created"});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
