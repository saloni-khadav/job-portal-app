
import { Webhook } from 'svix';
import user from '../models/user.js';

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(
      JSON.stringify(req.body),
      {
        'svix-id': req.headers['svix-id'],
        'svix-timestamp': req.headers['svix-timestamp'],
        'svix-signature': req.headers['svix-signature']
      }
    );

    const { data, type } = evt;
    console.log('Webhook Type:', type);  
    console.log('Webhook Data:', data);  

    if (type === 'user.created') {
      await user.create({
        _id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
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
