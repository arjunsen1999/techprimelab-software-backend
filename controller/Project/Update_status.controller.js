const { Project_model } = require("../../models/Project.model");
const { validationResult } = require("express-validator");

const Update_status_controller = async (req, res) => {
  const { status } = req.body;
  const _id = req.params.id;
  try {
    // If any error exists then throw Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ status: "error", message: errors.array()[0].msg });
    }

    // check if it's not exists
    const project = await Project_model.findOne({ _id });
    if (!project) {
      return res.status(404).json({
        status: "not found",
        message: "Project not exists anymore",
      });
    }
    const updateProject = await Project_model.findByIdAndUpdate(_id, {
      $set: { status },
    });
    const response = {
      status: "success",
      message: "Update Successfully!",
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
  Update_status_controller,
};
