import { Router } from 'express'
import { allowTo, protectedRouter } from '../auth/auth.controller.js'
import { addDectionary, deleteDectionary, getAllDectionaries } from './dectionary.controller.js'
const  dectionaryRouter =Router()


dectionaryRouter.post('/',protectedRouter,allowTo('admin'),addDectionary)
dectionaryRouter.get('/',protectedRouter,allowTo('user','admin'),getAllDectionaries)
dectionaryRouter.delete('/:id',protectedRouter,allowTo('admin'),deleteDectionary)


                




export default dectionaryRouter