const File=require("../models/File")
const cloudinary=require("cloudinary").v2;
exports.localFileUpload=async(req,res)=>{
    try{
        //fetch file
        const file=req.files.file;
        console.log("File aa gyi-->",file)
        let path=__dirname + "/files/" + Date.now()+`.${file.name.split('.')[1]}`;
        file.mv(path,(err)=>{
            console.log(err)
        })
        res.json({
            success:true,
            message:"Local file uploaded successfully"
        })
    }
    catch(error){
        console.log(error)
    }
}
function checkFileSupport(fileType,fileSupported){
    return fileSupported.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    console.log(file.tempFilePath);
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.imageUpload=async (req,res)=>{
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags);
        const file=req.files.imageFile;
        const fileSupported=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1];
        if(!checkFileSupport(fileType,fileSupported)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }
        console.log("Uploading to BackendMediaServer");
        const response=await uploadFileToCloudinary(file,"BackendMediaServer");
        console.log(response);
        const fileData=await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"

        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong!"
        })
    }
}


exports.videoUpload=async (req,res)=>{
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags);
        const file=req.files.videoFile;
        const fileSupported=["mp4","mov"];
        const fileType=file.name.split('.')[1];
        if(!checkFileSupport(fileType,fileSupported)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }
        console.log("Uploading to BackendMediaServer");
        const response=await uploadFileToCloudinary(file,"BackendMediaServer");
        console.log(response);
        const fileData=await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully"

        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong!"
        })
    }
}

exports.imageSizeReducer=async (req,res)=>{
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags);
        const file=req.files.imageFile;
        const fileSupported=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1];
        if(!checkFileSupport(fileType,fileSupported)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }
        console.log("Uploading to BackendMediaServer");
        const response=await uploadFileToCloudinary(file,"BackendMediaServer" ,20);
        console.log(response);
        const fileData=await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"

        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong!"
        })
    }
}