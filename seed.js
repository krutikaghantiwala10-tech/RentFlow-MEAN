require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany(); await Vehicle.deleteMany();

  const admin = await User.create({ name: 'Admin', email: 'admin@rentflow.com', password: 'admin123', role: 'admin' });
  const owner = await User.create({ name: 'Ali Renter', email: 'owner@rentflow.com', password: 'owner123', role: 'rentalOwner', businessName: 'Ali Cars', phone: '03001234567' });
  await User.create({ name: 'Ahmed User', email: 'user@rentflow.com', password: 'user123', role: 'user', phone: '03009876543' });

  const vehicles = [
    { vehicleName: 'Toyota Corolla', brand: 'Toyota', category: 'Car', pricePerDay: 3000, description: 'Comfortable sedan for city travel', rentalOwnerId: owner._id },
    { vehicleName: 'Honda Civic',    brand: 'Honda',  category: 'Car', pricePerDay: 3500, description: 'Sporty and fuel efficient', rentalOwnerId: owner._id },
    { vehicleName: 'Suzuki Alto',    brand: 'Suzuki', category: 'Car', pricePerDay: 2000, description: 'Budget friendly city car', rentalOwnerId: owner._id },
    { vehicleName: 'Yamaha YBR',     brand: 'Yamaha', category: 'Bike', pricePerDay: 800, description: 'Reliable commuter bike', rentalOwnerId: owner._id },
    { vehicleName: 'Honda CD70',     brand: 'Honda',  category: 'Bike', pricePerDay: 600, description: 'Classic city bike', rentalOwnerId: owner._id },
    { vehicleName: 'Toyota Hilux',   brand: 'Toyota', category: 'Truck', pricePerDay: 6000, description: 'Heavy duty pickup truck', rentalOwnerId: owner._id },
    { vehicleName: 'Toyota Prado',   brand: 'Toyota', category: 'SUV', pricePerDay: 8000, description: 'Luxury SUV for long trips', rentalOwnerId: owner._id },
    { vehicleName: 'Kia Sportage',   brand: 'Kia',    category: 'SUV', pricePerDay: 5000, description: 'Modern crossover SUV', rentalOwnerId: owner._id },
    { vehicleName: 'Hyundai H1',     brand: 'Hyundai',category: 'Van', pricePerDay: 4500, description: 'Spacious family van', rentalOwnerId: owner._id },
  ];
  await Vehicle.insertMany(vehicles);

  console.log('Seed complete!');
  console.log('Admin:  admin@rentflow.com / admin123');
  console.log('Owner:  owner@rentflow.com / owner123');
  console.log('User:   user@rentflow.com  / user123');
  process.exit();
}
seed().catch(console.error);
