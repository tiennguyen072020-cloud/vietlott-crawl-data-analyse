const express = require('express');
const cron = require('node-cron');
const vietlottRoutes = require('./routes/vietlott');
const {getVietlottPower655Results, getVietlottMega645Results} = require('./service/ApiDrawer');
const {insertVietlottPower655Result,insertVietlottMega645Result} = require('./database/vietlottDA');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function runPower655() {
  try {
    
     for(var page=0; page < 3; page++)
      {
        const resultsArray = [];
         const results = await getVietlottPower655Results(page);

         // Lọc bỏ object trống
         const resultsArrayFilter = results.filter(item => item.date && item.period && item.numbers.length > 0 && item.extraNumber);
        //đẩy vào mảng
         resultsArray.push(...resultsArrayFilter);
       

         console.log("Kết quả Vietlott power 6/55:", resultsArray);
      
      resultsArray.forEach(async element => {
         await insertVietlottPower655Result(element.date, element.period, element.numbers, element.extraNumber );
      });

        console.log("page : " + page);
        console.log("sẽ deplay 1 phút");
         await delay(60 * 1000); // sleep 1 minute
      }
      
    
      
  } catch (err) {
    console.error("runPower655 error :", err);
  }

}
  
async function runMega645() {
  try {
    
     for(var page=0; page < 3; page++)
      {
        const resultsArray = [];
         const results = await getVietlottMega645Results(page);

         // Lọc bỏ object trống
         const resultsArrayFilter = results.filter(item => item.date && item.period && item.numbers.length > 0);
        //đẩy vào mảng
         resultsArray.push(...resultsArrayFilter);
       

         console.log("Kết quả Vietlott mega 6/45:", resultsArray);
      
      resultsArray.forEach(async element => {
         await insertVietlottMega645Result(element.date, element.period, element.numbers, element.extraNumber );
      });

       console.log("page : " + page);
        console.log("sẽ deplay 1 phút");
         await delay(60 * 1000); // delay 1 phút
      }
      
    
      
  } catch (err) {
    console.error("Test error:", err);
  }

}

cron.schedule('* * * * *', () => {
  console.log('Running every day at 19 PM');

  runPower655();
  runMega645();
  

  // You can call DB queries, API requests, cleanup tasks here
});





app.use(express.json()); // Parse JSON body
//app.use('/api/vietlott', vietlottRoutes);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});