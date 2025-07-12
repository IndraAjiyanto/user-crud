import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUser(): Promise<User[]>{
        const users = await this.userService.getAllUsers();
        return users;
    }

    @Get(':id')
    async getUserById(@Param('id') id :number): Promise<User | null>{
        const user = await this.userService.getUserById(Number(id));
        return user;
    }

    @Post()
    async createUser(@Body() userData: CreateUserDto): Promise<User>{
        const user = await this.userService.createUser(userData);
        return user;
    }
}