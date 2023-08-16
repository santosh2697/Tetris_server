const Express = require("express");
const Routes = Express.Router();
const Controllers = require("../controller/controller");

Routes.get("/", Controllers.showAllUsers);

Routes.post("/createUser", Controllers.createUser);

Routes.post("/updateUser", Controllers.updateUser);

Routes.use("/users", async (req, res) => {
  res.send("hello world");
});
module.exports = Routes;
