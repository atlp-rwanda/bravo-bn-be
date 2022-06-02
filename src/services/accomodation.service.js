import db from '../database/models/index.js';
const accomodations = db['accomodation']
import { fileUpload } from "../helpers/multer";

export const createAccomodation = async (req, res) => {
    try {

		if (req.file) {
			req.body.image = await fileUpload(req);
		} 
		else {
			req.body.image =
				"https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
		}

		const newUser = await accomodations.create(req.body);
		const {name,description,location,image,availability,highlight,amenities} = req.body;
		return res.status(201).json({status:"success", data:{name,description,location,image,availability,highlight,amenities}, message:"New Accomodation have been created"});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
export const  getAllAccomodation = async (req, res) => {
	try{
        accomodations.findAndCountAll().then(accomodations => {
				return res.status(200).json({status:"success",data:accomodations,message:"Retrieved"});
			})	
	}
	catch(error) {
		return res.status(500).json(error.message);
	}
};

export const updateAccomodation = async(req, res) => {

	try{
	const id = req.params.id;
	if (req.file) {
		req.body.image = await fileUpload(req);
	} 
	else {
		req.body.image =
			"https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
	}
	accomodations.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Accomodation was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update accomodation with id=${id}. Maybe accomodation was not found or req.body is empty!`
		  });
		}
	  })
	}catch(err) {
		res.send(err)
	
  };
}

export const getSingleAccomodation = async (req, res) => {
	try{
		const id = req.params.id;


		const accomodation =  await accomodations.findOne({
			where:{id},
			include:['rooms']
		})

	  if(!accomodation){
		  return res.status(404).json({
			  status:"fail",
			  message:"No accomdation found with that ID"
		  })
	  }
        
	  res.status(200).json({
		  status:"success",
		  data:{
			accomodation
		  }
	  })
	  }catch(err)  {
		res.status(500).json({
			status:"error",
			message:"error while getting Accomodation"
		})  
  }
}

export const deleteAccomodation = async (req, res) => {
	try{
		const id = req.params.id;
	accomodations.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  
			return res.status(200).json({status:true,message:"Accomodation deleted successfully"});
		  
		} else {
		  res.send({
			message: `Cannot delete accomodation with id=${id}. Maybe accomodation was not found!`
		  });
		}
	  });
	  }catch(err)  {
		res.send({ error: "This Accomodation doesn't exist!" })	  
  }
}



