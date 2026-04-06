require('dotenv').config();
const mongoose = require('mongoose');
const Payment = require('./models/Payment');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);

  const payments = await Payment.find({
    $or: [{ commission: null }, { ownerEarning: null }]
  });

  console.log(`Found ${payments.length} payments to fix...`);

  for (const p of payments) {
    p.commission   = Math.round(p.amount * 0.10);
    p.ownerEarning = p.amount - p.commission;
    await p.save();
    console.log(`Fixed payment ${p._id}: amount=${p.amount}, commission=${p.commission}, ownerEarning=${p.ownerEarning}`);
  }

  console.log('Done.');
  process.exit();
}

migrate().catch(err => { console.error(err); process.exit(1); });
