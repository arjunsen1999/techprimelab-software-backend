const { Project_model } = require("../../models/Project.model");
const { validationResult } = require("express-validator");

const Post_project_controller = async (req, res) => {
  const {
    project_name,
    reason,
    type,
    division,
    category,
    priority,
    dept,
    location,
    start_date,
    end_date,
  } = req.body;
  try {
    // If any error exists then throw Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ status: "error", message: errors.array()[0].msg });
    }

    const new_start_date = new Date(start_date);
    const new_end_date = new Date(end_date);

    if(new_end_date < new_start_date){
      return res.status(400).json({
        status : "error",
        message : "The end date should be greater than the start date"
      })
    }

    const createProject = await Project_model.create({
      project_name,
      reason,
      type,
      division,
      category,
      priority,
      dept,
      location,
      start_date,
      end_date,
    });
    const response = {
      status: "success",
      message: "Successfully Created!",
    };
    return res.status(201).json(response);
  } catch (error) {
    // Create error response
    const error_response = {
      status: "fail",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = {
  Post_project_controller,
};
