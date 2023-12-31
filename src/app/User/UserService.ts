import UserRepository from "./UserRepository"

import { CreateUserDTO, ServiceUserDTO } from "./UserDTO";

import createUser from "./features/createUser.service";
import getAllUsers from "./features/getAllUsers.service";
import getOneUser from "./features/getOneUser.service";
import updateUser from "./features/updateUser.service";
import deleteUser from "./features/deleteUser.service";
import { ObjectId } from "mongoose";

class UserService{
    constructor(private repository:UserRepository){}

    async createSer(body:CreateUserDTO){
        return await createUser(body, this.repository)
    }

    async getAllSer(page:number, limit:number){
        return await getAllUsers(page, limit, this.repository)
    }

    async getOneSer(id:ObjectId){
        return await getOneUser(id, this.repository)
    }

    async updateSer(id:ObjectId, body:ServiceUserDTO){
        return await updateUser(id, body, this.repository)
    }

    async deleteSer(id:ObjectId){
        return await deleteUser(id, this.repository)
    }
}

export default UserService