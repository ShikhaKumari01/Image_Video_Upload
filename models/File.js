const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})
fileSchema.post("save", async function(doc){
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info=await transporter.sendMail({
            from:"MAIL from Shikha",
            to:doc.email,
            subject:"New file uploaded on Cloudinary",
            html:`<h2>Hello everyone</h2><p>File uploaded successfully: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
    }
    catch{

    }
})
const File=mongoose.model("File",fileSchema)
module.exports=File;