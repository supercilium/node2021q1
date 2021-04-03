import express from 'express';
import uniqid from 'uniqid';
import { User, UserFull, ParamsWithId, ParamsWithFilter } from 'types';
import { USERS } from './users';

import * as Joi from 'joi';
import {
    ContainerTypes,
    // Use this as a replacement for express.Request
    ValidatedRequest,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation';

const validator = createValidator();

const bodySchema = Joi.object<User>({
    login: Joi.string().required(),
    password: Joi.string().regex(/(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().greater(4).less(130).required(),
});

interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: User;
}

const port = process.env.PORT || 3001;

const router = express.Router();
const app = express().use('/user', router);

router.use(express.urlencoded());
router.use(express.json());

router.get<null, any, any, ParamsWithFilter>('/filter', (req, res) => {
    const { filter, limit } = req.query;
    res.send(getAutoSuggestUsers(filter, Number(limit)));
});

router.get<ParamsWithId>('/:id', (req, res) => {
    const { id } = req.params;
    const user: UserFull = USERS.find(elem => elem.id === id);
    if (user?.id) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.delete<ParamsWithId>('/:id', (req, res) => {
    const { id } = req.params;
    const user: UserFull = USERS.find(elem => elem.id === id);
    if (user?.id) {
        user.isDeleted = true;
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post<null, any, User>(
    '/',
    validator.body(bodySchema),
    (req: ValidatedRequest<UserRequestSchema>, res) => {
        const { body } = req;
        const userToUpdate = USERS.findIndex(elem => elem.login === body.login);
        if (userToUpdate >= 0) {
            USERS[userToUpdate] = { ...USERS[userToUpdate], ...body };
            res.send(`Updated user ${body.login}`);
        } else {
            res.sendStatus(404);
        }
    });

router.put<null, any, User>(
    '/',
    validator.body(bodySchema),
    (req: ValidatedRequest<UserRequestSchema>, res) => {
        const { body } = req;
        USERS.push({ ...body, isDeleted: false, id: uniqid() });
        res.send(`Added new user: ${body.login}`);
    });

const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] => {
    const filteredUsers: User[] = USERS.
        filter(elem => elem.login.includes(loginSubstring)).
        sort((a, b) => a.login <= b.login ? -1 : 1);

    return filteredUsers.slice(0, limit);
};

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
