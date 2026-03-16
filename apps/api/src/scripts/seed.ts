import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/db.js';
import { UserModel } from '../models/User.js';
import { ServiceRequestModel } from '../models/ServiceRequest.js';
import { ConversationModel } from '../models/Conversation.js';
import { MessageModel } from '../models/Message.js';

async function seed() {
  await connectDatabase();

  await Promise.all([
    MessageModel.deleteMany({}),
    ConversationModel.deleteMany({}),
    ServiceRequestModel.deleteMany({}),
    UserModel.deleteMany({}),
  ]);

  const password = await bcrypt.hash('Password123!', 10);

  const [customer, provider] = await UserModel.create([
    {
      name: 'Sarah Carter',
      email: 'sarah.customer@patchup.dev',
      password,
      role: 'customer',
      phone: '312-555-0111',
      customerProfile: {
        city: 'Chicago',
        state: 'IL',
        address: '1420 W Grace St',
        profileImage: 'https://placehold.co/200x200?text=SC',
        savedRequestIds: [],
      },
    },
    {
      name: 'Mike Alvarez',
      email: 'mike.provider@patchup.dev',
      password,
      role: 'provider',
      phone: '312-555-0188',
      providerProfile: {
        bio: 'Reliable neighborhood repair specialist for small home and tech jobs.',
        serviceCategories: ['handyman', 'computer_help', 'tv_mounting', 'furniture_assembly'],
        serviceArea: 'Chicago',
        yearsOfExperience: 7,
        rating: 4.9,
        availabilityStatus: 'available',
      },
    },
    {
      name: 'PatchUp Admin',
      email: 'admin@patchup.dev',
      password,
      role: 'admin',
      phone: '312-555-0199',
    },
  ]);

  const requests = await ServiceRequestModel.create([
    {
      customerId: customer._id,
      category: 'tv_mounting',
      title: 'Mount a 55-inch TV in living room',
      description: 'Need help mounting the TV and hiding the cables on drywall.',
      urgency: 'medium',
      location: 'Chicago, IL',
      preferredTime: 'Saturday afternoon',
      status: 'open',
    },
    {
      customerId: customer._id,
      providerId: provider._id,
      category: 'computer_help',
      title: 'Laptop running very slow',
      description: 'My Windows laptop has become sluggish and needs a cleanup.',
      urgency: 'high',
      location: 'Chicago, IL',
      preferredTime: 'Weekday evening',
      status: 'in_progress',
    },
    {
      customerId: customer._id,
      providerId: provider._id,
      category: 'furniture_assembly',
      title: 'Assemble office desk',
      description: 'Need a flat-pack desk assembled in home office.',
      urgency: 'low',
      location: 'Chicago, IL',
      preferredTime: 'Flexible',
      status: 'completed',
    },
  ]);

  customer.customerProfile!.savedRequestIds = requests.map((request) => request._id);
  await customer.save();

  const conversation = await ConversationModel.create({
    requestId: requests[1]._id,
    participantIds: [customer._id, provider._id],
    lastMessageAt: new Date(),
  });

  await MessageModel.create([
    {
      conversationId: conversation._id,
      senderId: customer._id,
      content: 'Could you stop by after 6 PM tomorrow?',
    },
    {
      conversationId: conversation._id,
      senderId: provider._id,
      content: 'Yes, that works. I will bring a spare SSD in case you need one.',
    },
  ]);

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
