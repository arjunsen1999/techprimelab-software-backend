const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(process.env.MONGO_URL).then(() =>{
      console.log({connection : `Connection Successfully!`});
  }).catch((error) =>{
      console.log({connection : `Connection Failed!`, error});
  })
};

module.exports = {
  connection,
};
