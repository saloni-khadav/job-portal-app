import { Webhook } from "svix";
import user from "../models/user.js";
export const clerkWebhooks=async(requestAnimationFrame,res)=>{
    try{
          const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

          await whook.verify(JSON.stringify(requestAnimationFrame.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
          })
         
          const{data,type}=req.body

          switch(type){
            case 'user.created':{

                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+ " "+data.last_name,
                    image:data.image_url,
                    resume:''
                }

                await user.create(userData)
                res.json({})
                break;

            }
             case 'user.updated':{
                const userData={
                   
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+ " "+data.last_name,
                    image:data.image_url,
                   
                }
                await user.findByIdAndUpdate(data.id,userData)
                 res.json({})
                break;
            }
             case 'user.deleted':{
                await user.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
          }

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:'webhooks error'})

    }
}