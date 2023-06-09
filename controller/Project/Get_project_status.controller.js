const { Project_model } = require("../../models/Project.model");

const Get_project_status_controller = async (req, res) => {
  try {
    const data = [];
    const total_project = await Project_model.find().count();
    data.push({ title: "Total Projects", count: total_project });
    const total_closed = await Project_model.find({ status: "Closed" }).count();
    data.push({ title: "Close", count: total_closed });
    const total_running = await Project_model.find({
      status: "Running",
    }).count();
    data.push({ title: "Running", count: total_running });
    const currentDate = new Date();
    const total_closure_delay = await Project_model.find({
      end_date: {$lt : currentDate},
    }).count();
    data.push({ title: "Closure Delay", count: total_closure_delay });
    const total_cancelled = await Project_model.find({
      status: "Cancelled",
    }).count();
    data.push({ title: "Cancelled", count: total_cancelled });

    const response = {
      status: "success",
      data: data,
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
  Get_project_status_controller,
};
