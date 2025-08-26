import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, NotContains } from "class-validator";

export class CreateUserDto {
    @IsEmail() @Transform(({ value }) => value?.trim()) @IsNotEmpty() @NotContains("space") email: string; 
    @Transform(({ value }) => value?.trim()) @IsNotEmpty() @NotContains("space") password : string; 
    @IsOptional() username: string ; 
    
}

export class UpdateUserDto {}
