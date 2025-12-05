const axios = require('axios');
const cheerio = require('cheerio');

async function getVietlottMega645Results(pageNum) {
  const url = 'https://vietlott.vn/ajaxpro/Vietlott.PlugIn.WebParts.Game645CompareWebPart,Vietlott.PlugIn.WebParts.ashx';
    // Body JSON
  const body = {
    "ORenderInfo":
    {"SiteId":"main.frontend.vi",
      "SiteAlias":"main.vi",
      "UserSessionId":"",
      "SiteLang":"vi",
      "IsPageDesign":false,
      "ExtraParam1":"",
      "ExtraParam2":"",
      "ExtraParam3":"",
      "SiteURL":"",
      "WebPage":null,"SiteName":"Vietlott","OrgPageAlias":null,"PageAlias":null,"FullPageAlias":null,"RefKey":null,"System":1},
      "Key":"b1d2e46f","GameDrawId":"",
    "ArrayNumbers":[["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""]],
    "CheckMulti":false,
    "PageIndex":pageNum
      };
  
  const { data } = await axios.post(url, body, {
    headers: {
      'x-csrftoken': '187b9b7fae60ba35820c2bd92ca5d6ce992a7c1317f2d59b037cecc76f79cec149091c99c4a7354e',
      'x-ajax-token': '5f96868e96c4ca498879214da7baa28ebd049986620f047df582e05bdf2424fa',
      'x-ajaxpro-method': 'ServerSideDrawResult',
      'session-cookie': '187b759c4cffce3d46c19ea218991a245a36df77158e5dbb4f43301ec9f89cb2bc7c51463e1e58ae6995604a78128298; Path=/; Secure; HttpOnly; Expires=Thu, 27 Nov 2025 04:56:33 GMT;'
    }
  });

  const dataHtml = JSON.stringify(data.value.HtmlContent);
   const $ = cheerio.load(dataHtml);

   const results = [];


$('table tr').each((i, row) => {
  const date = $(row).find('td').eq(0).text().trim();
  const period = $(row).find('td a').text().trim();

  // lấy tất cả số trong class bong_tron
  const nums = [];
  //const valuetemp = $(row).find('td div span').html();
 // console.log(valuetemp);
  $(row).find('td div span').each((j, el) => {
    const value = $(el).text().trim();
    if(value!==null && value!=='' && value !== '|')
      nums.push(value);
   // console.log(value);
  });

  // số cuối cùng là extraNumber
 // const extraNumber = nums.pop();
  
  results.push({
    date,
    period,
    numbers: nums
  });
});

//console.log(results);
  return results;
}
async function getVietlottPower655Results(pageNum) {
  const url = 'https://vietlott.vn/ajaxpro/Vietlott.PlugIn.WebParts.Game655CompareWebPart,Vietlott.PlugIn.WebParts.ashx';
    // Body JSON
  const body = {
    "ORenderInfo":
      { "SiteId":"main.frontend.vi",
        "SiteAlias":"main.vi",
        "UserSessionId":"",
        "SiteLang":"vi",
        "IsPageDesign":false,
        "ExtraParam1":"",
        "ExtraParam2":"",
        "ExtraParam3":"",
        "SiteURL":"",
        "WebPage":null,
        "SiteName":"Vietlott",
        "OrgPageAlias":null,"PageAlias":null,"FullPageAlias":null,"RefKey":null,"System":1},
        "Key":"bb79cadc","GameDrawId":"",
        "ArrayNumbers":[["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","",""]],
        "CheckMulti":false,
        "PageIndex":pageNum
      };
  
  const { data } = await axios.post(url, body, {
    headers: {
      'x-csrftoken': '187b713ee217d14df11b3b4ceff6e2b102d6eacb0e2eda7a43d66776fe3216eff769edf3b2db72c1',
      'x-ajax-token': '0e014a476617df869b340ec7ab61689d9c17330c2bdd87df27b021acded12976',
      'x-ajaxpro-method': 'ServerSideDrawResult',
      'session-cookie': '187b759c4cffce3d46c19ea218991a245a36df77158e5dbb4f43301ec9f89cb2bc7c51463e1e58ae6995604a78128298; Path=/; Secure; HttpOnly; Expires=Thu, 27 Nov 2025 04:56:33 GMT;'
    }
  });

  const dataHtml = JSON.stringify(data.value.HtmlContent);
   const $ = cheerio.load(dataHtml);

   const results = [];


$('table tr').each((i, row) => {
  const date = $(row).find('td').eq(0).text().trim();
  const period = $(row).find('td a').text().trim();

  // lấy tất cả số trong class bong_tron
  const nums = [];
  //const valuetemp = $(row).find('td div span').html();
 // console.log(valuetemp);
  $(row).find('td div span').each((j, el) => {
    const value = $(el).text().trim();
    if(value!==null && value!=='' && value !== '|')
      nums.push(value);
   // console.log(value);
  });

  // số cuối cùng là extraNumber
  const extraNumber = nums.pop();

  results.push({
    date,
    period,
    numbers: nums,
    extraNumber
  });
});

//console.log(results);
  return results;
}
module.exports = { getVietlottPower655Results,getVietlottMega645Results };
