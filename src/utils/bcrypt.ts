import { UserInput } from "../models/user.model";
import bcrypt from 'bcrypt';
import config from 'config';

export function hashPassword(input:UserInput) {
      const salt = bcrypt.genSaltSync(config.get<number>('saltRounds'));
      const hash = bcrypt.hashSync(input.password, salt);
    
    return hash;
};

export function comparePassword(inputPassword: string, hashPassword: string) {
    return bcrypt.compareSync(inputPassword, hashPassword);
}