const Model = require("../model/modelSchema");

//Create user validation
const createUserController = async (req, res) => {
  try {
    const name = req.body.name;
    const highScore = req.body.highScore;

    //Check for invalid input or missing paramters
    // 400 error code corresponds to
    //(the server cannot or will not process the request due to something that is perceived to be a client error)
    if (!name || (!highScore && !(highScore === 0))) {
      return res.status(400).send({ msg: "Invalid input" });
    }

    //Check if user already exists in database
    const findUser = await Model.findOne({ name: name });
    if (findUser?.name) {
      return res.status(400).send({ msg: "User already exists" });
    }

    //In case of valid input send the 201 status code (server has successfully processed the request)
    const modelResponce = await Model.create({
      name: name,
      highScore: highScore,
    });
    if (modelResponce) {
      return res.status(201).send({ msg: "Data created", Data: modelResponce });
    }
  } catch (error) {
    console.log(error);
    //500 internal server error is, as the name implies, a general problem with the website's server
    return res.status(500).send({ msg: error });
  }
};

//Update user valudation
const updateUserController = async (req, res) => {
  try {
    const name = req.body.name;
    const highScore = req.body.highScore;

    //Check for invalid input or missing paramters
    // 400 error code corresponds to
    //(the server cannot or will not process the request due to something that is perceived to be a client error)
    if (!name || (!highScore && !(highScore === 0))) {
      return res.status(400).send({ msg: "Invalid input" });
    }

    //Check if user already exists in database
    const findUser = await Model.findOne({ name: name });
    if (findUser?.name) {
      //In case of valid input send the 201 status code (server has successfully processed the request)
      const modelResponce = await Model.findOneAndUpdate(
        { name: name },
        { highScore: highScore }
      ); //filter, to be updated value

      //Sorting all documents based on descending order
      const sortedDocuments = await Model.find({}).sort({ highScore: -1 });
      if (modelResponce) {
        return res
          .status(201)
          .send({ msg: "Data updated", Data: sortedDocuments });
      }
    } else {
      return res.status(400).send({ msg: "User does not exist in database" });
    }
  } catch (error) {
    console.log(error);
    //500 internal server error is, as the name implies, a general problem with the website's server
    return res.status(500).send({ msg: error });
  }
};

//Show all user details when server receives a GET request
const showAllUsersController = async (req, res) => {
  try {
    //Sorting all documents based on descending order
    const sortedDocuments = await Model.find({}).sort({ highScore: -1 });
    return res.status(201).send({ msg: "Sorted data", Data: sortedDocuments });
  } catch (error) {
    console.log(error);
    //500 internal server error is, as the name implies, a general problem with the website's server
    return res.status(500).send({ msg: error });
  }
};

module.exports = {
  createUser: createUserController,
  updateUser: updateUserController,
  showAllUsers: showAllUsersController,
};
