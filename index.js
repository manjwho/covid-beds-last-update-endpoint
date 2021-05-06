const fetch = require("node-fetch");

module.exports = () => {
  let data = { date: {} };
  fetch("https://spreadsheets.google.com/feeds/cells/1mMnpzNjMsDUYUCafG3oTCFMsIBeQsOICxKB_EBT273U/5/public/full?min-row=2&max-row=2&min-col=15&max-col=15&alt=json")
    .then(response => response.json())
    .then(data => data.feed.entry[0].content.$t)
    .then(date => {
      data["date"]["annotate"] = {};
      data["date"]["annotate"]["notes"] = `Last updated: ${date}`;
      // console.log(JSON.stringify(data["date"]));
      return data;}
     )
  return data;
}
//
// {
//   "date":
//   {
//     "annotate":
//     {
//       "notes":"Last updated: 3-May-2021"
//     }
//   }
// }
