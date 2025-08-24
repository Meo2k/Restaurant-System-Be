import { UserDomain } from "../domain/user.domain";

export interface IUserRepository {
    findByEmail(email: string) : Promise<UserDomain|null>; 
    findByEmailObject(email: string) : Promise<UserDomain|null>; 
    registerUser(user: UserDomain): Promise<UserDomain|null>;
}