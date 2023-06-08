const { Project_model } = require("../../models/Project.model");

const Get_project_controller = async (req, res) => {
  const query = { ...req.query };
  const match = ["limit", "page", "sort"];
  match.forEach((ele) => delete query[ele]);
  try {
    const search_query = {};
    if (query.search) {
      search_query[`$or`] = [
        { project_name: { $regex: query.search, $options: "i" } },
        { status: { $regex: query.search, $options: "i" } },
        { reason: { $regex: query.search, $options: "i" } },
        { priority: { $regex: query.search, $options: "i" } },
      ];
    }
    let project = Project_model.find(search_query);
    const result = await Project_model.find(search_query).count();

    // Sort the data
    let sort = "";
    if (req.query.sort) {
      sort += `-${req.query.sort}`
    }
    project = project.sort(`-createdAt ${sort}`);

    // Pegination
    const limit = req.query.limit || 6;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    project = project.skip(skip).limit(limit);
    project = await project;
    const response = {
      status: "sucess",
      result: result,
      page: Math.ceil(result / limit),
      data: {
        project,
      },
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
  Get_project_controller,
};
