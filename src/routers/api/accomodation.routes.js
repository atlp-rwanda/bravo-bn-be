import express from 'express';
import multer from "multer";
import { createAccomodation, getAllAccomodation,deleteAccomodation, updateAccomodation,getSingleAccomodation} from "../../controllers/accomodation.controller.js";
const router=express.Router();
const storage=multer.diskStorage({});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image"))
    {
cb(null,true);
    }
    else{
        cb("invalid image file!",false);
    }
};
const uploads=multer({storage,fileFilter});
router.get('/', getAllAccomodation);
router.post('/create',uploads.single("image"),createAccomodation);
router.put('/update/:id',uploads.single("image"),updateAccomodation);
router.delete('/delete/:id',deleteAccomodation);
router.get('/:id',getSingleAccomodation)

export default router;