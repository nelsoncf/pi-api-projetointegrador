import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Order} from './oders.model'

class OrdersRouter extends ModelRouter<Order> {
  constructor(){
    super(Order)
  }

  findMenu = (req, resp, next) => {
    Order.findById(req.params.id, "+orderItems")
       .then(rest =>{
         if(!rest){
           throw new NotFoundError('Order not found')
         }else{
           resp.json(rest.orderItems)
           return next()
         }
       }).catch(next)
  }

  replaceMenu = (req, resp, next)=>{
      Order.findById(req.params.id).then(rest=>{
        if(!rest){
          throw new NotFoundError('Order not found')
        }else{
          rest.orderItems = req.body //ARRAY de MenuItem
          return rest.save()
        }
      }).then(rest=>{
        resp.json(rest.orderItems)
        return next()
      }).catch(next)
  }

  applyRoutes(application: restify.Server){
    application.get('/orders', this.findAll)
    application.get('/orders/:id', [this.validateId, this.findById])
    application.post('/orders', this.save)
    application.put('/orders/:id', [this.validateId,this.replace])
    application.patch('/orders/:id', [this.validateId,this.update])
    application.del('/orders/:id', [this.validateId,this.delete])

    application.get('/orders/:id/orderItems', [this.validateId, this.findMenu])
    application.put('/orders/:id/orderItems', [this.validateId, this.replaceMenu])
  }

}

export const ordersRouter = new OrdersRouter()
