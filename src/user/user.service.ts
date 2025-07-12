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

    async createUser(UserData: CreateUserDto): Promise<User>{
        const user = await this.prismaservice.user.create({
            data: UserData,
        });
        return user;
    }
}