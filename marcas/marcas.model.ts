import * as mongoose from 'mongoose'

export interface MenuItem extends mongoose.Document {
  name: string,
  price: number
}

export interface Marca extends mongoose.Document {
  name: string,
  menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
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
