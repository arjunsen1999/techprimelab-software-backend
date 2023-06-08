const { Project_model } = require("../../models/Project.model");

const Get_project_chart_controller = async (req, res) => {
  try {
    const total_str = await Project_model.find({ dept: "Startegy" }).count();
    const close_str = await Project_model.find({
      dept: "Startegy",
      status: "Closed",
    }).count();

    const total_fin = await Project_model.find({ dept: "Finance" }).count();
    const close_fin = await Project_model.find({
      dept: "Finance",
      status: "Closed",
    }).count();

    const total_qlt = await Project_model.find({ dept: "Quality" }).count();
    const close_qlt = await Project_model.find({
      dept: "Quality",
      status: "Closed",
    }).count();

    const total_man = await Project_model.find({ dept: "Maintenance" }).count();
    const close_man = await Project_model.find({
      dept: "Maintenance",
      status: "Closed",
    }).count();

    const total_sto = await Project_model.find({ dept: "Stores" }).count();
    const close_sto = await Project_model.find({
      dept: "Stores",
      status: "Closed",
    }).count();

    const total_hr = await Project_model.find({ dept: "HR" }).count();
    const close_hr = await Project_model.find({
      dept: "HR",
      status: "Closed",
    }).count();

    const response = {
      status: "success",
      labels: ["STR", "FIN", "QLT", "MAN", "STO", "HR"],
      total_project: [
        total_str,
        total_fin,
        total_qlt,
        total_man,
        total_sto,
        total_hr,
      ],
      total_close: [
        close_str,
        close_fin,
        close_qlt,
        close_man,
        close_sto,
        close_hr,
      ],
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
  Get_project_chart_controller,
};
