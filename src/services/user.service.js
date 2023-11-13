const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
async function getUserById(userId) {
  try {
    console.log("line 15 user service : "+userId)
    // const validUserId = mongoose.Types.ObjectId(userId);
    // Use the Mongoose `findById()` method to find a user by _id
    // const user = await User.findById(validUserId);

    // Alternatively, you can use findOne() method
    // console.log("line 22 user service getuserbyid:" + User)
    const user = await User.findById(userId);

    return user; // Return the user object (or null if not found)
  } catch (error) {
    // Handle errors, log, and potentially throw or handle them based on your application's needs
    console.error("Error fetching user by ID:", error);
    // throw new Error("Failed to fetch user by ID");

    throw new ApiError(
      httpStatus.BAD_REQUEST,
      '""userId"" must be a valid mongo id'
    );
  }
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)
/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
async function getUserByEmail(email) {
  try {
    // Use the Mongoose `findOne()` method to find a user by email
    const user = await User.findOne({ email });

    return user; // Returns the user object (or null if not found)
  } catch (error) {
    console.error("Error fetching user by email:", error);
    // throw new Error("Failed to fetch user by email");

    throw new ApiError(
      httpStatus.BAD_REQUEST,
      '""userId"" must be a valid mongo id'
    );
  }
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

async function createUser(userData) {
  try {
    // Check if the email is already taken using the User.isEmailTaken() method
    const isEmailTaken = await User.isEmailTaken(userData.email);

    if (isEmailTaken) {
      // If the email is already taken, throw an error using ApiError
      throw new ApiError(httpStatus.OK, "Email already taken");
    }

    // If the email is not taken, create and return a new User object
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    // Handle and rethrow any errors
    if (error instanceof ApiError) {
      throw error; // Re-throw ApiError without modification
    } else {
      // Handle other errors or reformat if needed
      console.error("Error creating user:", error);
      throw new Error("Failed to create a new user");
    }
  }
}
module.exports = { getUserById, getUserByEmail, createUser };
