import { Router } from 'express'
import { deleteUser, getallUsers, getUser, updateUser, uploadProfilePic } from './user.controller.js'
import { uploadSinleFile } from '../../fileUpload/fileUpload.js'
import { allowTo, protectedRouter } from '../auth/auth.controller.js'

const userRouter=Router()

userRouter.get('/',getallUsers)
userRouter.get('/:id',getUser)

userRouter.patch('/uploadImage',protectedRouter,allowTo('user','admin'),uploadSinleFile('image','user'),uploadProfilePic)
userRouter.put('/:id',uploadSinleFile('image','user'),updateUser)
userRouter.delete('/:id',deleteUser)

export default userRouter 