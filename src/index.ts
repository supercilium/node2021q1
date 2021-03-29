import express from 'express';
import { User } from 'types';
import { USERS } from './users';

import * as Joi from 'joi'
import {
    ContainerTypes,
    // Use this as a replacement for express.Request
    ValidatedRequest,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
} from 'express-joi-validation'

const validator = createValidator()

const bodySchema = Joi.object<User>({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().regex(/(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().greater(4).less(130).required(),
    isDeleted: Joi.boolean().required(),
})

interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: User;
}

const port = process.env.PORT || 3001;

const router = express.Router();
const app = express().use('/user', router);

router.use(express.urlencoded());
router.use(express.json());

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user: User = USERS.find(user => user.id === id)
    if (user?.id) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user: User = USERS.find(user => user.id === id)
    if (user?.id) {
        user.isDeleted = true;
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post(
    '/',
    validator.body(bodySchema),
    (req: ValidatedRequest<UserRequestSchema>, res) => {
        const { ...user } = req.body;
        const userToUpdate = USERS.findIndex(elem => elem.id === user.id);
        if (userToUpdate >= 0) {
            USERS[userToUpdate] = { ...user }
            res.send(`Updated user ${USERS[userToUpdate].login}`);
        } else {
            const newUser: User = user;
            USERS.push(newUser);
            res.send(`Added new user: ${newUser.login} with id: ${newUser.id}`);
        }
    });


router.get('/filter/:str', (req, res) => {
    const { str } = req.params;
    res.send(getAutoSuggestUsers(String(str), USERS));
})

const getAutoSuggestUsers = (loginSubstring: string, limit: User[]) => {
    const filteredUsers: User[] = limit.
        filter(elem => elem.login.indexOf(loginSubstring) >= 0).
        sort((a, b) => a.login <= b.login ? -1 : 1);

    return filteredUsers;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})