import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import {NotAuthorizedError} from 'restify-errors'
import {User} from '../users/users.model'
import {environment} from '../common/environment'

export const authenticate: restify.RequestHandler = (req, resp, next)=>{
  const {email, password} = req.body
  User.findByEmail(email, '+password') 
    .then(user=>{
      if(user && user.matches(password)){ //2nd
        
        resp.json({name: user.name, email: user.email})
        return next(false)
      } else {
        return next(new NotAuthorizedError('Invalid Credentials'))
      }
  }).catch(next)
}
