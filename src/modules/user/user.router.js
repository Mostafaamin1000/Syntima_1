import { Router } from 'express'
import { deleteUser, getallUsers, getUser, updateUser, uploadProfilePic } from './user.controller.js'
import { allowTo, protectedRouter } from '../auth/auth.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'

const userRouter=Router()

userRouter.get('/',getallUsers)
userRouter.get('/:id',getUser)

userRouter.patch('/uploadImage',protectedRouter,allowTo('user','admin'),uploadSingleFile('image','user'),uploadProfilePic)
userRouter.put('/:id',uploadSingleFile('image','user'),updateUser)
userRouter.delete('/:id',deleteUser)

export default userRouter 