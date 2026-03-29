import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing in .env");
  return secret;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, city, country } = req.body;

    // ✅ 1. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    // ✅ 2. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ 3. Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      city,
      country
    });

    // ✅ 4. Generate token
    const token = jwt.sign(
      { id: user._id },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name, email, city, country }
    });

  } catch (error: any) {

    // ✅ 5. Handle duplicate key error (extra safety)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email,
        city: user.city,
        country: user.country
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};