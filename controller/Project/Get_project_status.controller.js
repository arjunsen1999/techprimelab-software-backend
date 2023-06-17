const { Project_model } = require("../../models/Project.model");

const Get_project_status_controller = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          total_project: { $sum: 1 },
          total_closed: {
            $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] },
          },
          total_running: {
            $sum: { $cond: [{ $eq: ["$status", "Running"] }, 1, 0] },
          },
          total_closure_delay: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "Running"] },
                    { $lt: ["$end_date", new Date()] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          total_cancelled: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
    ];

    const result = await Project_model.aggregate(pipeline);

    const data = [
      { title: "Total Projects", count: result[0].total_project || 0 },
      { title: "Closed", count: result[0].total_closed || 0 },
      { title: "Running", count: result[0].total_running || 0 },
      { title: "Closure Delay", count: result[0].total_closure_delay || 0 },
      { title: "Cancelled", count: result[0].total_cancelled || 0 },
    ];

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
