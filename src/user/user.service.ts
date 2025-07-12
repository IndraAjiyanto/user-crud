import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor( protected prismaservice: PrismaService) {}

    async createUser(UserData: CreateUserDto): Promise<User>{
        const user = await this.prismaservice.user.create({
            data: UserData,
        });
        return user;
    }
}