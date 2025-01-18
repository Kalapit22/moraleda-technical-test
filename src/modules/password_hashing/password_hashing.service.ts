    import { Injectable } from "@nestjs/common";
    import * as bcrypt from 'bcrypt';
    @Injectable()
    export class PasswordHashingService{

        private readonly saltOurRounds = 10;

        public async hashPassword(password:string) : Promise<string> {
            return bcrypt.hash(password,this.saltOurRounds);
        }

        public async comparePassword(plainTextPassword:string,hashedPassword:string) : Promise<boolean>{
            return await bcrypt.compare(plainTextPassword,hashedPassword);
        }

    }