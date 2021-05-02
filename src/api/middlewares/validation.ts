import * as Joi from 'joi';
import {
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation';
import { UserCreationAttributes, GroupCreatingInterface, Permission } from '../../types';

export const validator = createValidator();


export const bodySchemaUser = Joi.object<UserCreationAttributes>({
  login: Joi.string().required(),
  password: Joi.string().regex(/(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
  age: Joi.number().greater(4).less(130).required(),
});

export const userBodyValidator = validator.body(bodySchemaUser)

export const bodySchemaGroup = Joi.object<GroupCreatingInterface>({
  name: Joi.string().required(),
  permission: Joi.array().items(Joi.string()).required(),
});

export const groupBodyValidator = validator.body(bodySchemaGroup)
