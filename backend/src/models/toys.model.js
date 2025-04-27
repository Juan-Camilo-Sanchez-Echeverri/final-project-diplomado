import mongoose from 'mongoose';

import { validateMongo } from '../helpers/validate-mongo.helper.js';
import { toyCategories } from '../constants/toy.constants.js';

const { model } = mongoose;

const toySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: toyCategories,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String, // URL of a toy image (optional)
      required: false,
    },
    images: {
      type: [{ url: String }], // Array of URLs of toy images (optional)
      required: false,
      default: [],
    },
    tags: {
      type: [String], // Para agregar etiquetas relacionadas con el artículo, como "recomendado", "para niños", etc.
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true, id: false },
    toObject: { virtuals: true, id: false },
    id: false,
  },
);

toySchema.post('save', validateMongo);
toySchema.post('findOneAndUpdate', validateMongo);

// Configuración del virtual para comentarios
toySchema.virtual('comments', {
  ref: 'ToyComment',
  localField: '_id',
  foreignField: 'toy',
  options: {
    populate: {
      path: 'user',
      select: 'name _id',
    },
  },
});

// Create the toy model
const Toy = model('Toy', toySchema);

export { Toy };
