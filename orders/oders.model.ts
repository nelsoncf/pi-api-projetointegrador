import * as mongoose from 'mongoose'

export interface OrderItem extends mongoose.Document {
    quantity: number, 
    menuId: string
}

export interface Order extends mongoose.Document {
    address: string
    number: number
    optionalAddress: string
    paymentOption: string
    orderItems: OrderItem[]
    id?: string
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

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  optionalAddress: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  paymentOption: {
    type: String,
    required: true
  },
  orderItems: {
    type: [menuSchema],
    required: false,
    select: false,
    default: []
  }
})


export const Order = mongoose.model<Order>('Order', orderSchema)
