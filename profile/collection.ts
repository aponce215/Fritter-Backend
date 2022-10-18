import type {HydratedDocument, Types} from 'mongoose';
import type {Profile} from './model';
import ProfileModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to view a profile
 *
 * Note: HydratedDocument<Profile> is the output of the ProfileModel() constructor,
 * and contains all the information in Profile. https://mongoosejs.com/docs/typescript.html
 */
class ProfileCollection {
  /**
   * Add a Profile to the collection.
   *
   * @param {string} authorId - The id of the author of the profile
   * @param {string} content - The id of the content of the profile
   * @return {Promise<HydratedDocument<Profile>>} - The newly created profile
   */
  static async addOne(authorId: Types.ObjectId | string): Promise<HydratedDocument<Profile>> {
    const date = new Date();
    const profile = new ProfileModel({
      authorId,
      description: "Insert Profile Description Here",
      displayName: "Display Name",
    });
    await profile.save(); // Saves profile to MongoDB
    return profile.populate('authorId');
  }

  /**
   * Find a profile by username
   *
   * @param {string} username - The username of author of profile
   * @return {Promise<HydratedDocument<Profile>> | Promise<null> } - The profile associated with username, if any
   */
  static async findOne(username: string): Promise<HydratedDocument<Profile>> {
    const author = await UserCollection.findOneByUsername(username);

    return ProfileModel.findOne({authorId: author._id}).populate('authorId');
  }

  /**
   * Update a profile with the new content
   *
   * @param {string} profileId - The id of the profile to be updated
   * @param {string} description - The new description of the profile
   * @param {string} displayName - The new display name of the profile
   * @return {Promise<HydratedDocument<Profile>>} - The newly updated profile
   */
  static async updateOne(profileId: Types.ObjectId | string, description: string, displayName: string): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({_id: profileId});

    if (description != ""){
        profile.description = description;
    }
    if (displayName != ""){
        profile.displayName = displayName;
    }
    
    await profile.save();
    return profile.populate('authorId');
  }

}

export default ProfileCollection;