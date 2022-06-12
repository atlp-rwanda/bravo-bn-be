import db from '../database/models/index.js';
const accomodations = db['accomodation']
const UserAccommodation=db['UserAccommodation']
import { Sequelize } from 'sequelize';
import { fileUpload } from "../helpers/multer";

export const createAccomodation = async (req, res) => {

    try {
		if (req.user.dataValues.role !== 'travel admin') {
			return res.status(403).json({status:"fail",message: "not traveler admin"})
		 }
		if (req.file) {
			req.body.image = await fileUpload(req);
		} 
		else {
			req.body.image =
				"https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
		}

		const newAccomodation = await accomodations.create(req.body);
		const {name,description,location,image,geoLocation,highlight,amenities} = req.body;
		return res.status(201).json({status:"success", data:{name,description,location,image,geoLocation,highlight,amenities}, message:"New Accomodation have been created"});
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
		if (req.user.dataValues.role !== 'travel admin') {
			return res.status(403).json({status:"fail",message: "not traveler admin"})
		 }
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
			message: `Cannot update accomodation with id=${id}.`
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
			include:['rooms','amenities']
			
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
		if (req.user.dataValues.role !== 'travel admin') {
			return res.status(403).json({status:"fail",message: "not traveler admin"})
		 }

		const id = req.params.id;
		const accomodation =  await accomodations.findOne({where:{id}})
	   
		if(!accomodation){
			return res.status(404).json({
				status:"fail",
				message:"No acccomodation found with that ID"
			})
		}
	
		await accomodations.destroy({where:{id}})
	
		res.status(200).json({
			status:"success",
			message:"accomodation deleted successfully"
		})
		}catch(err) {
			res.send(err)
	  };
}

export const updateLike = async (req, res) => {
	const userId=req.user.dataValues.id
	const accommodationId=req.params.id
	console.log(userId);
    try {
      const accommodation = await accomodations.findOne({where:{
        id: accommodationId
      }});
      if (!accommodation) {
       res.status(400).json({message:"not found"})
      }

      const like = await UserAccommodation.findOne(
        {where:{accommodationId,
        userId}}
      );

		if (like) {
			console.log(like.dataValues.like);
				if(like.dataValues.like)
				{
				await UserAccommodation.update({
				like: null 
				},{
					where:{accommodationId,userId}
				});
				res.status(200).json({ message: 'Like removed' });
			}else
			{
				await UserAccommodation.update({
					like: true 
				},{
					where:{accommodationId,userId}
				});
				res.status(200).json({ message: 'Like added' });
			}
		}
		else
		{
			await UserAccommodation.create({
				accommodationId,
				userId,
				like: true 
			});
			res.status(200).json({ message: 'Like added' });
		}
    } catch (error) {
   		 res.status(500).json(error.message)
    }
  };

  export const getLikes = async (req, res) => {
	const accommodationId=req.params.id
    try {
      const likes =await UserAccommodation.findAndCountAll({
		where: { accommodationId, like: true },
	  });
      res.status(200).json({likes:likes.count});
    } catch (error) {
      res.status(500).json(error.message)
    }
  };
