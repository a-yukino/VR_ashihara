const fs = require("fs");
const express = require("express");
const router = express.Router();

let masterData = [];

router.get('/', (req, res, next) => {
   //console.log(req.query.data);

   let split_raw_data = req.query.data.split(",");
   console.log(split_raw_data.length);
   for (let i = 0; i < split_raw_data.length - 1; i++) {
      let time_list = split_raw_data[i];
      let y_position = split_raw_data[i + 1];

      const for_json_data = {
         time: time_list,
         y_position: y_position,
      };
   
      masterData.push(for_json_data);
   }
   let now = new Date();
   const jsonData = JSON.stringify(masterData, null, ' ')
   fs.writeFileSync("public/JSON/" + now.getTime() + "_VR_Goggle_Y_Position.json", jsonData);
})
module.exports = router;