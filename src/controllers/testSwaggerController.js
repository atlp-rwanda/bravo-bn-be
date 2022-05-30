export const testSwaggerRouter=async (req,res)=>{
    try {
        res.status(200).json({
        message:"test swagger router"
    })
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
    
}
