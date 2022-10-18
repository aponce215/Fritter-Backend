import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ProfileCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
// import * as util from './util';

const router = express.Router();

/**
 * Get profile from an author.
 *
 * @name GET /api/profile?authorId=id
 *
 * @return {ProfileResponse} - Profile created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/',
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const authorProfile = await ProfileCollection.findOne(req.query.author as string);
    const response = authorProfile.map(util.constructProfileResponse);
    res.status(200).json(response);
  }
);

/**
 * Modify a profile
 *
 * @name PUT /api/profiles/:id
 *
 * @param {string} content - the new content for the profile
 * @return {ProfileResponse} - the updated profile
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the profile
 * @throws {404} - If the profileId is not valid
 * @throws {400} - If the profile content is empty or a stream of empty spaces
 * @throws {413} - If the profile content is more than 140 characters long
 */
router.put(
  '/:profileId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const profile = await ProfileCollection.updateOne(req.params.profileId, req.body.description, req.body.displayName);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      profile: util.constructFreetResponse(profile)
    });
  }
);

export {router as profileRouter};