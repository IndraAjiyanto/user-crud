import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor( protected prismaservice: PrismaService) {}

    async getAllUsers(): Promise<User[]>{
        const users = await this.prismaservice.user.findMany();
        return users;
    }

    async getUserById(id: number): Promise<User | null>{
        const user = await this.prismaservice.user.findUnique({
            where : { id },
        });
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null>{
        const user = await this.prismaservice.user.findUnique({
            where : { email },
        });
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }


    async createUser(UserData: CreateUserDto): Promise<User>{
        const existingUser = await this.getUserByEmail(UserData.email);
        if(existingUser){
            throw new NotFoundException(`user with email ${UserData.email} alredy exists`);
        }
        const user = await this.prismaservice.user.create({
            data: UserData,
        });
        return user;
    }

    async updateUser(id: number, userData: Partial<CreateUserDto>): Promise<User | null>{
        const user = await this.prismaservice.user.update({
            where: {id},
            data: userData,
        });
        return user;
    }

    async deleteUser(id: number): Promise<User | null>{
        const user = await this.prismaservice.user.delete({
            where: {id}
        });
        return user;
    }
}