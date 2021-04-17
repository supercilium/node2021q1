import * as Joi from 'joi';
import {
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation';
import { UserCreationAttributes } from 'types/user';

export const validator = createValidator();


export const bodySchema = Joi.object<UserCreationAttributes>({
    login: Joi.string().required(),
    password: Joi.string().regex(/(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().greater(4).less(130).required(),
});

export const userBodyValidator = validator.body(bodySchema)