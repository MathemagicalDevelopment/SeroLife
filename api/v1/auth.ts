// Functions

import { genSalt, hash } from "bcrypt";
import { BaseError, MissingDetails, UnkownError } from "../constants";
import { generateToken } from "../helpers/generateToken";
import { isPasswordMatch } from "../helpers/isPasswordMatch";
import { UserObject } from "../types"
import { createUser, findOneUser } from "./user";
import { Request, Response, Router } from "express"

const AuthRouter = Router()

// Sign Up

AuthRouter.post('/', async (req: Request, res: Response) => {
    try {
        if (req && req.body) {
            const validUserBody: UserObject & { password: string; passwordMatch: string; } = req.body;
            if (validUserBody) {
                console.log(req.body);
                const { password, passwordMatch, name } = validUserBody;
                if (password === passwordMatch) {
                    const userExists = await findOneUser({ name });
                    if (userExists !== null) {
                        return res.status(400).json({ success: false, message: 'Username taken' })
                    } else {
                        genSalt(10, (err, salt) => {
                            if (err) {
                                console.error('Failed to generate salt');
                                return res.status(500).json({ success: false, message: UnkownError });
                            } else {
                                hash(password, salt, async (err: any, hash: string) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(422).json({ success: false, message: 'Unable to process password, please try again using standard characters' });
                                    } else {
                                        const storeUser = await createUser({ name, password: hash, created: new Date() });
                                        if (storeUser) {
                                            return res.status(200).json({ success: true, message: 'User Created' });
                                        } else {
                                            return res.status(400).json({ success: false, message: 'Error creating User' })
                                        }
                                    }
                                })
                            }
                        })
                    }
                } else {
                    return res.status(400).json({ success: false, message: 'Passwords don\t match.' })
                }
            } else {
                return res.status(422).json({ success: false, message: 'Missing user details' })
            }
        }
    } catch (error) {
        // Send to error logging service
        return res.status(500).json(BaseError);
    }
})

// Login

AuthRouter.post('/login', async (req: Request, res: Response) => {
    try {
        if (req && req.body) {
            const validLoginBody: { name: string; password: string } = req.body;
            if (validLoginBody) {
                const { password, name } = validLoginBody;
                const account = await findOneUser({ name });
                if (account && account._id) {
                    const passwordsMatch = await isPasswordMatch(password, account.password);
                    if (passwordsMatch) {
                        const token = generateToken(account._id);
                        return res.status(200).json({ success: true, message: 'User Authenticated', token })
                    } else {
                        return res.status(400).json({ success: false, message: 'Incorrect username or password' })
                    }
                } else {
                    return res.status(400).json({ success: false, message: 'User not found' })
                }
            } else {
                return res.status(400).json({ success: false, message: MissingDetails })
            }
        } else {
            return res.status(422).json({ success: false, message: MissingDetails })
        }
    } catch (error) {
        // Send to error logging service
        return res.status(500).json(BaseError);
    }
})

export default AuthRouter;