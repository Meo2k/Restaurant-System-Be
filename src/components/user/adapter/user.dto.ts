import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, NotContains } from "class-validator";

export class CreateUserDto {
    @IsEmail() @Transform(({ value }) => value?.trim()) @IsNotEmpty() @NotContains("space") email: string; 
    @Transform(({ value }) => value?.trim()) @IsNotEmpty() @NotContains("space") password : string; 
    
}

export class UpdateUserDto {}
