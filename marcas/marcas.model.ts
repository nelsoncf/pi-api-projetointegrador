import * as mongoose from 'mongoose'

export interface MenuItem extends mongoose.Document {
  id: string
  name: string
  price: number
  category: string
  imagePath: string
  description: string
  marcaId: string
}

export interface Marca extends mongoose.Document {
  name: string,
  menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  imagePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  marcaId: {
    type: String,
    required: true
  },
})

const marcaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  menu: {
    type: [menuSchema],
    required: false,
    select: false,
    default: []
  }
})


export const Marca = mongoose.model<Marca>('Marca', marcaSchema)
