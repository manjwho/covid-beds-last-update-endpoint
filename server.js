const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fetch = require("node-fetch");

server.use(middlewares)

server.get('/lastdate', (req, res) => {
  let last_updated_date = {};
  fetch("https://spreadsheets.google.com/feeds/cells/1mMnpzNjMsDUYUCafG3oTCFMsIBeQsOICxKB_EBT273U/5/public/full?min-row=2&max-row=2&min-col=15&max-col=15&alt=json")
    .then(response => response.json())
    .then(data => data.feed.entry[0].content.$t)
    .then(date => {
      last_updated_date["annotate"] = {};
      last_updated_date["annotate"]["notes"] = `Last updated: ${date}`;
      // console.log(JSON.stringify(data["date"]));
      // return data;
      res.jsonp(last_updated_date);
    })
})

server.use(router)
server.listen('port', process.env.PORT || 3000, () => {
// server.listen(3000, () => {
  console.log('JSON Server is running')
})
