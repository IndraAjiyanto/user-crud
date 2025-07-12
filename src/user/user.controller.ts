import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() userData: CreateUserDto): Promise<User>{
        const user = await this.userService.createUser(userData);
        return user;
    }
}