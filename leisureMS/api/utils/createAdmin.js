import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';


dotenv.config();
const createAdminUser = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASS;

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: adminUsername });

    if (!existingAdmin) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(adminPassword, salt);

      // Create the admin user
     await User.create({
        username: adminUsername,
        email: process.env.ADMIN_EMAIL,
        country: 'AdminLand',
        city: 'AdminCity',
        phone: '1234567890',
        password: hashedPassword,
        isAdmin: Boolean(process.env.IS_ADMIN),
      });

    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};


export default createAdminUser;