// Base Functions

import { Types } from "mongoose";
import { BaseError, MissingDetails } from "../constants";
import { checkToken } from "../helpers/checkToken";
import { AuthorisedRequest, UserObject, UserQuery, UserUpdateObject } from "../types";
import  { Response, Router } from "express";
import { User } from "../models/user.model";

const UserRouter = Router();


export async function findOneUser(matchQuery: UserQuery) {
    const user = await User.findOne(matchQuery)
    return user;
}

export async function createUser(obj: UserObject) {
    const user = await User.create(obj);
    return user;
}

export async function updateUser(matchQuery: UserQuery, data: UserUpdateObject) {
    const user = await User.updateOne(matchQuery, data)
    return user;
}

// GET User

UserRouter.get('/:id', checkToken, async (req: AuthorisedRequest, res: Response) => {
    try {
        if (req && req?.params && req?.params.id && req?.token && req?.userId && req.params.id === req.userId) {
            const user = await findOneUser({ _id: req.params.id });
            if (user) {
                return res.status(200).json({ success: true, user })
            } else {
                return res.status(500).json({ success: false, message: 'Unable to find user' })
            }
        } else {
            return res.status(401).json({ success: false, message: 'Unathorised' })
        }
    } catch (error) {
        return res.status(500).json(BaseError);
    }
})

// Update favourite recipes

UserRouter.put('/favourite/:id', checkToken, async (req: AuthorisedRequest, res: Response) => {
    try {
        if (req && req?.body && req?.params && req?.params?.id && req?.userId) {
            const user = await findOneUser({ _id: req.userId });
            const favourites = req?.body?.addToFavourites ? [...user.favourites, req.params.id] : user.favourites.filter((id: Types.ObjectId) => id !== req.params.id);

            const updated = await updateUser({ _id: req.params.id }, { favourites });
            if (updated && updated.acknowledged) {
                return res.status(200).json({ success: true, message: 'Updated favourites' })
            } else {
                return res.status(500).json({ success: false, message: 'Error updating favourites' })
            }

        } else {
            return res.status(422).json({ success: false, message: MissingDetails });
        }
    } catch (error) {
        return res.status(500).json(BaseError);
    }
})

export default UserRouter;