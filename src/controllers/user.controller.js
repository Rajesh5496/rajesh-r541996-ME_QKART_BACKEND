const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUser() function
/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - Return the whole user object fetched from Mongo

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "walletMoney": 500,
 *     "address": "ADDRESS_NOT_SET",
 *     "_id": "6010008e6c3477697e8eaba3",
 *     "name": "crio-users",
 *     "email": "crio-user@gmail.com",
 *     "password": "criouser123",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 *     "__v": 0
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * HTTP 404 - If user entity not found in DB
 * 
 * @returns {User | {address: String}}
 *
 */
const getUser = catchAsync(async (req, res) => {

  console.log("line 43 user controller ")
  
    const { userId } = req.params;
    // Use the User service layer to fetch user data by userId
    // const user = await userService.findById(userId);
    const user = await userService.getUserById(userId);

    if (!user) {
      // If user data doesn't exist, throw an ApiError
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
  
    res.status(httpStatus.OK).json(user);
  
});

//     // If user data exists, return the user object
//     return user;
//   } catch (error) {
//     // Handle and rethrow any errors
//     if (error instanceof ApiError) {
//       throw error; // Re-throw ApiError without modification
//     } else {
//       console.error('Error getting user details:', error);
//       throw new Error('Failed to get user details');
//     }
//   }
// });


module.exports = {
  getUser,
};
