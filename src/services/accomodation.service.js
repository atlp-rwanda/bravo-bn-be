import db from '../database/models/accomodation.js';
const accomodation = db['accomodations']

export const createAccomodation = async (req, res) => {
    try {
		const newUser = accomodation.create(req.body);
		const {name,description,location,image,availability,highlight,amenities} = req.body;
		return res.status(201).json({status:"success", data:{name,description,location,image,availability,highlight,amenities}, message:"New Accomodation have been created"});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
export const getAllAccomodation = async (req, res) => {
	try{
        accomodation.findAndCountAll().then(accomodation => {
				return res.status(200).json({status:"success",data:accomodation,message:"Retrieved"});
			})	
	}
	catch(error) {
		return res.status(500).json(error.message);
	}
};



