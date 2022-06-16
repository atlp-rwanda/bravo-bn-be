import db from '../database/models/index.js';
const {accommodations, UserAccommodation} = db;


export const updateLike = async (req, res) => {
	const userId=req.user.dataValues.id
	const accommodationId=req.params.id
	console.log(userId);
    try {
      const accommodation = await accommodations.findOne({where:{
        id: accommodationId
      }});
      if (!accommodation) {
       res.status(400).json({message:"Accommodation not found"})
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
