import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import 'dotenv/config'; // Make sure dotenv is loaded
import doctorModel from './models/doctorModel.js';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const doctors = [
  {
    name: 'Dr. Richard James',
    image: '../frontend/src/assets/doc1.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Emily Larson',
    image: '../frontend/src/assets/doc2.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Larson has a profound dedication to women\'s health, providing empathetic, cutting-edge care for patients.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Sarah Patel',
    image: '../frontend/src/assets/doc3.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Patel focuses on skincare and dermatology, blending modern science with proven treatments for glowing health.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Christopher Lee',
    image: '../frontend/src/assets/doc4.png',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Lee provides warm, child-friendly care, ensuring that babies and young adults receive the utmost attention.',
    fees: 40,
    address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Jennifer Garcia',
    image: '../frontend/src/assets/doc5.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Garcia is a leading authority in neurological disorders, helping patients recover cognitive and physical capabilities.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Andrew Williams',
    image: '../frontend/src/assets/doc6.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Williams is committed to finding the best neurological solutions, focusing on comprehensive testing and treatment.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Christopher Davis',
    image: '../frontend/src/assets/doc7.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Timothy White',
    image: '../frontend/src/assets/doc8.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. White champions the holistic well-being of expectant mothers and general gynecology practices.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Ava Mitchell',
    image: '../frontend/src/assets/doc9.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Mitchell integrates the latest technological advancements in dermatological therapy for all string types and conditions.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Jeffrey King',
    image: '../frontend/src/assets/doc10.png',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. King connects beautifully with children, ensuring a calm, painless, and joyous clinic visit.',
    fees: 40,
    address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Zoe Kelly',
    image: '../frontend/src/assets/doc11.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Kelly utilizes modern therapeutic frameworks for effective management of neurological challenges.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Patrick Harris',
    image: '../frontend/src/assets/doc12.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Harris is constantly updating his practice with the most recent neurological breakthroughs.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Chloe Evans',
    image: '../frontend/src/assets/doc13.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Evans treats her patients like family, aiming for long-lasting health through simple lifestyle changes.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Ryan Martinez',
    image: '../frontend/src/assets/doc14.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Martinez handles delicate procedures with the utmost integrity, respect, and clinical precision.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Amelia Hill',
    image: '../frontend/src/assets/doc15.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Hill specializes in regenerative dermatology and advanced laser corrective skin treatments.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  }
];

const seedDoctors = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    console.log('Database connected!');

    // 2. Clear existing doctors just in case
    await doctorModel.deleteMany({});
    console.log('Cleared existing doctors.');

    // 3. Hash a universal password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    console.log('Starting seed process (This may take a minute since images are being uploaded to Cloudinary)...');

    // 4. Iterate over doctors
    for (let i = 0; i < doctors.length; i++) {
      const doc = doctors[i];
      let uploadRes;

      try {
        // Upload image to cloudinary
        const absolutePath = path.resolve(doc.image);
        if (fs.existsSync(absolutePath)) {
          uploadRes = await cloudinary.uploader.upload(absolutePath, { resource_type: "image" });
        } else {
          console.warn(`File not found: ${absolutePath}, skipping image upload.`);
        }
      } catch (err) {
        console.error(`Failed to upload image for ${doc.name}:`, err);
      }

      const newDoctor = new doctorModel({
        name: doc.name,
        email: `doc${i + 1}@narayanacare.com`,
        password: hashedPassword,
        image: uploadRes ? uploadRes.secure_url : '',
        speciality: doc.speciality,
        degree: doc.degree,
        experience: doc.experience,
        about: doc.about,
        fees: doc.fees,
        address: doc.address,
        available: true,
        date: Date.now()
      });

      await newDoctor.save();
      console.log(`Saved doctor: ${doc.name}`);
    }

    console.log('🎉 Seeding successfully completed! All mocked doctors have been moved to MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error in seeding!', error);
    process.exit(1);
  }
}

seedDoctors();
