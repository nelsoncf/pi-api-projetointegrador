import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Marca} from './marcas.model'

class MarcasRouter extends ModelRouter<Marca> {
  constructor(){
    super(Marca)
  }

  findMenu = (req, resp, next) => {
    Marca.findById(req.params.id, "+menu")
       .then(rest =>{
         if(!rest){
           throw new NotFoundError('Marca not found')
         }else{
           resp.json(rest.menu)
           return next()
         }
       }).catch(next)
  }

  replaceMenu = (req, resp, next)=>{
      Marca.findById(req.params.id).then(rest=>{
        if(!rest){
          throw new NotFoundError('Marca not found')
        }else{
          rest.menu = req.body //ARRAY de MenuItem
          return rest.save()
        }
      }).then(rest=>{
        resp.json(rest.menu)
        return next()
      }).catch(next)
  }

  applyRoutes(application: restify.Server){
    application.get('/marcas', this.findAll)
    application.get('/marcas/:id', [this.validateId, this.findById])
    application.post('/marcas', this.save)
    application.put('/marcas/:id', [this.validateId,this.replace])
    application.patch('/marcas/:id', [this.validateId,this.update])
    application.del('/marcas/:id', [this.validateId,this.delete])

    application.get('/marcas/:id/menu', [this.validateId, this.findMenu])
    application.put('/marcas/:id/menu', [this.validateId, this.replaceMenu])
  }

}

export const marcasRouter = new MarcasRouter()
