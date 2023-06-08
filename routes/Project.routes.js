const projectRouter = require("express").Router();
const { body } = require("express-validator");
const {
  Post_project_controller,
} = require("../controller/Project/Post_project.controller");
const {
  Get_project_controller,
} = require("../controller/Project/Get_project.controller");
const {
  Get_project_chart_controller,
} = require("../controller/Project/Get_project_chart.controller");

const {
  Update_status_controller,
} = require("../controller/Project/Update_status.controller");

const {
  Get_project_status_controller,
} = require("../controller/Project/Get_project_status.controller");

projectRouter
  .route("/")
  .post(
    [
      body("project_name", "Enter Project Name").not().isEmpty(),
      body("reason", "Select Reason").not().isEmpty(),
      body("type", "Select Type").not().isEmpty(),
      body("division", "Select Division").not().isEmpty(),
      body("category", "Select Category").not().isEmpty(),
      body("priority", "Select Priority").not().isEmpty(),
      body("dept", "Select Department").not().isEmpty(),
      body("location", "Select Location").not().isEmpty(),
      body("start_date", "Select Start Date").not().isEmpty(),
      body("end_date", "Select End Date").not().isEmpty(),
    ],
    Post_project_controller
  )
  .get(Get_project_controller);
projectRouter.route("/:id").patch(Update_status_controller);
projectRouter.route("/chart").get(Get_project_chart_controller);
projectRouter.route("/status").get(Get_project_status_controller);

module.exports = {
  projectRouter,
};
