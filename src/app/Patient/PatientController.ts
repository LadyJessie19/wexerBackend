import { Request, Response } from "express";
import PatientService from "./PatientService";

import PatientYupSchema from "./PatientSchema";

import newError from "../../utils/ErrorHandler";
import serverError from "../../utils/ServerError";
import { ObjectId } from "mongoose";

class PatientController{
    constructor(private service: PatientService){}

    async createCon(req: Request, res: Response){
        const { body, params: { doctor_id } } = req

        try {
            await PatientYupSchema.create().validate(body)
          } catch (error: any) {
            return res.status(400).json({ errors: error.errors })
          }

        const result = await this.service.createSer({...body, doctorId: doctor_id as unknown as ObjectId})

        if ('error' in result) {
          return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).send(result)
    }

    async getAllCon(req: Request, res: Response){
      const { query:{ page = 1, limit = 10}, params:{ doctor_id } } = req
      console.log()
        const result = await this.service.getAllSer(doctor_id as unknown as ObjectId, page as number, limit as number)
        
        if('error' in result) {
        return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(result)
    }

    async getOneCon(req: Request, res: Response){
      const { params:{ patient_id } } = req
        const result = await this.service.getOneSer(patient_id as unknown as ObjectId)

        if("error" in result){
            return res.status(result.statusCode).json(result)
        }

        return res.status(result.statusCode).json(result)
    }

    async updateCon(req: Request, res: Response){
      const { body, params: { patient_id } } = req
        const id = patient_id as unknown as ObjectId
        const payload = {id, body}

        try {
            await PatientYupSchema.update().validate(payload)
        } catch (error: any) {
            return res.status(400).json(newError("The id/body is invalid", 400))
        }
        
        const result = await this.service.updateSer(patient_id as unknown as ObjectId, body)
        
        if('error' in result) {
        return res.status(400).json(newError("The request failed", 400, "result updateCon"))
        }

        return res.status(200).json(result)
    }

    async deleteCon(req: Request, res: Response){
      const { patient_id } = req.params
      const id = patient_id as unknown as ObjectId
        
        try {
            await PatientYupSchema.delete().validate({ id })
        } catch (error:any) {
            return res.status(400).json(newError("The id/body is invalid", 400))
        }
        
        const result = await this.service.deleteSer(patient_id as unknown as ObjectId)
        return res.status(result.statusCode).json(result)
    }
}

export default PatientController