import { IsEmail, IsNotEmpty, IsString, IsBoolean, MinLength, MaxLength, IsOptional } from "class-validator";
import { IsUnique } from "src/shared/validations/is-unique";


export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string;
    
    @IsEmail()
    @IsUnique({tableName: 'users', column: 'email'}) // custom decorator
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password: string;

    @IsOptional() // this will ignore the validation if the field is not present
    @IsBoolean()
    isActive: boolean;
}
