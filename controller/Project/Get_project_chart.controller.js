const { Project_model } = require("../../models/Project.model");

const createlabels = (name) =>{
 if(name == "Startegy"){
  return "STR";
 }else if(name === "Finance"){
  return "FIN";
 }else if(name === "Quality"){
  return "QLT";
 }else if(name === "Maintenance"){
  return "MAN";
 }else if(name === "Stores"){
  return "STO";
 }else if(name === "HR"){
  return "HR"
 }
}

const Get_project_chart_controller = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$dept",
          total: { $sum: 1 },
          closed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Closed"] }, 1, 0],
            },
          },
        },
      },
    ];

    const results = await Project_model.aggregate(pipeline);

    const labels = [];
    const total_project = [];
    const total_close = [];

    results.forEach((result) => {
      const { _id, total, closed } = result;
      const name = createlabels(_id)
      labels.push(name);
      total_project.push(total);
      total_close.push(closed)
    });

    const response = {
      status: "success",
      labels,
      total_project,
      total_close,
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
