import mongoose, { models } from "mongoose";

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true, // e.g., Toyota, Ford, Tesla
    trim: true,
  },
  model: {
    type: String,
    required: true, // e.g., Corolla, F-150, Model S
    trim: true,
  },
  year: {
    type: Number,
    required: true, // e.g., 2024
  },
  price: {
    type: Number,
    required: true, // e.g., 25000 (in dollars)
  },
  mileage: {
    type: Number, // e.g., 5000 (in kilometers)
    default: 0,
  },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"], // Allowed values
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic", "CVT", "Semi-Automatic"],
    required: true,
  },
  bodyType: {
    type: String,
    enum: ["Sedan", "SUV", "Hatchback", "Truck", "Coupe", "Convertible", "Van"],
    required: true,
  },
  color: {
    type: String,
    default: "White",
  },
  features: {
    type: [String], // e.g., ['Bluetooth', 'Airbags', 'Navigation System']
  },
  engine: {
    type: {
      capacity: { type: Number, required: true }, // e.g., 2000 (cc)
      horsepower: { type: Number }, // e.g., 150 (hp)
      torque: { type: Number }, // e.g., 300 (Nm)
    },
    required: true,
  },
  dimensions: {
    type: {
      length: { type: Number }, // e.g., 4800 (in mm)
      width: { type: Number }, // e.g., 1800 (in mm)
      height: { type: Number }, // e.g., 1400 (in mm)
    },
  },
  images: {
    type: [String], // URLs for car images
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Car = models.Car || mongoose.model("Car", carSchema);
export default Car;
