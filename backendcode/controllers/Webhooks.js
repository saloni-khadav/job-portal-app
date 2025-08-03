// import { Webhook } from "svix";
// import user from "../models/user.js";
// export const clerkWebhooks=async(req,res)=>{
//     try{
//           const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//           await whook.verify(JSON.stringify(req.body),{
//             "svix-id":req.headers["svix-id"],
//             "svix-timestamp":req.headers["svix-timestamp"],
//             "svix-signature":req.headers["svix-signature"]
//           })
         
//           const{data,type}=req.body

//           switch(type){
//             case 'user.created':{

//                 const userData={
//                     _id:data.id,
//                     email:data.email_addresses[0].email_address,
//                     name:data.first_name+ " "+data.last_name,
//                     image:data.image_url,
//                     resume:''
//                 }

//                 await user.create(userData)
//                 res.json({})
//                 break;

//             }
//              case 'user.updated':{
//                 const userData={
                   
//                     email:data.email_addresses[0].email_address,
//                     name:data.first_name+ " "+data.last_name,
//                     image:data.image_url,
                   
//                 }
//                 await user.findByIdAndUpdate(data.id,userData)
//                  res.json({})
//                 break;
//             }
//              case 'user.deleted':{
//                 await user.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }
//             default:
//                 break;
//           }

//     }catch(error){
//         console.log(error.message);
//         res.json({success:false,message:'webhooks error'})

//     }
// }



import { Webhook } from 'svix';
import user from '../models/user.js';

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(
      req.body,
      {
        'svix-id': req.headers['svix-id'],
        'svix-timestamp': req.headers['svix-timestamp'],
        'svix-signature': req.headers['svix-signature']
      }
    );

    const { data, type } = evt;
    console.log('Webhook Type:', type);  
    console.log('Webhook Data:', data);  

    // if (type === 'user.created') {
    //   await user.create({
    //     _id: data.id,
    //     name: `${data.first_name} ${data.last_name}`,
    //     email: data.email_addresses[0].email_address ||"no-email@example.com",
    //     image: data.image_url,
    //     resume: ''
    //   });
    // }

//     if (type === 'user.created') {
//   const email = data.email_addresses?.[0]?.email_address || 'no-email@example.com';

//   await user.create({
//     _id: data.id,
//     name: `${data.first_name} ${data.last_name}`,
//     email,
//     image: data.image_url,
//     resume: ''
//   });
// }
if (type === 'user.created') {
  // Check if email exists, else fallback to null or empty string
  const email = (data.email_addresses && data.email_addresses.length > 0)
    ? data.email_addresses[0].email_address
    : null; // or 'no-email@example.com' or ''

  await user.create({
    _id: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: email,
    image: data.image_url,
    resume: ''
  });
}


    res.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).json({ success: false });
  }
};
