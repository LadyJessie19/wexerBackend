import { Request, Response } from "express"
import UserService from "./UserService"

import UserYupSchema from "./UserSchema"

import serverError from "../../utils/ServerError"
import newError from "../../utils/ErrorHandler"
import { ObjectId } from "mongoose"
import UserFactory from "./UserFactory"

class UserController {
    constructor(private service:UserService){}

    async createCon(req:Request, res:Response){
        const { body } = req

        const payload = UserFactory.newUser(body)
    
        try{
            await UserYupSchema.create().validate(payload)
        } catch(error:any){
            return res.status(400).json(newError(error.message, 400))
        }
        
        const result = await this.service.createSer(payload)
        
        if("error" in result){
            return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(result)
    }

    async getAllCon(req:Request, res:Response){
        const { query:{ page = 1, limit = 10} } = req
        const result = await this.service.getAllSer(Number(page), Number(limit))
        
        if('error' in result) {
        return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(result)
    }

    async getOneCon(req:Request, res:Response){
        const { params:{ id } } = req
        const result = await this.service.getOneSer(id as unknown as ObjectId)

        if("error" in result){
            return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(result)
    }

    async updateCon(req:Request, res:Response){
        const { body, params: { id } } = req
        const payload = {id, body}

        try {
            await UserYupSchema.update().validate(payload)
        } catch (error: any) {
            return res.status(400).json(newError(error.message, 400))
        }
        
        const result = await this.service.updateSer(id as unknown as ObjectId, body)
        
        if('error' in result) {
        return res.status(400).json(newError("The request failed", 400, "result updateCon"))
        }

        return res.status(result.statusCode).json(result)
    }

    async deleteCon(req:Request, res:Response){
        const { id } = req.params
        
        try {
            await UserYupSchema.delete().validate(req.params)
        } catch (error:any) {
            return res.status(400).json(serverError(error))
        }
        
        const result = await this.service.deleteSer(id as unknown as ObjectId)
        return res.status(result.statusCode).json(result)
    }
}

export default UserController