const express = require('express');
const app = express();
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const server = io
const mongoose = require('mongoose')
const urlParser = require('url-parse');
const homeRoute = require("./routes/home")
const {hub} = require("./websocket/hub")

const moment = require("moment")
require("moment-timezone")
moment.tz.setDefault("Asia/Seoul")
moment.locale("ko")

// project 환경변수 모듈이에용 많이 써용  깃허브같은곳에 js파일에 포함시키면 보안상 문제가 있어서
require("dotenv").config()

function set() {
  app.set('view engine', 'ejs');
  // express router 에서 req.app.get("name") 으로 불러올수있어요.
  // REST API로 사용하시려면 이부분에 세팅 하시고
  app.set("moment", moment)
  // socket 같은 http 외에서 다루실려면  util 디렉토리에 세팅하시고 여기저기서 불러다가 쓰시면 될거에용 ㅎ
}

function middlewares() {
  app.use(express.static("./public")) // static serveFiles (img, js, etc..)
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }));
}

// 서버 재시작 해야되는거 아닌가여?? 저 노드몬 가끔 작동 안해요.. 아 ㅋㅋㅋ
// 근데 저도 사실 기억이 잘안나여 이런거는 한번 세팅해놓고 그냥 깃허브에 박재해놓고 돌려써서

function dbConn() {
  mongoose.connect(
    process.env.DB_CONNECTION,
    () => {
      console.log("## Connected to DB")
    }
  )
}

function routes() {
  app.use("/", homeRoute)
}

function websocket() {
    hub(server)
}

function serve() {
  http.listen(8000, () => {
    console.log('listening...');
  });
}

function App() {
  set()
  middlewares()
  dbConn()
  routes()
  websocket()
  serve()
}
App()


// let db;
//let regexUrl = /\b(http|https):\/\/((?:[a-z\d-]*\.)*[a-z\d-]*\.[a-z\d-]*)\/([\S]*)/;

// mongodb.connect(mongoUrl, (err, client) => {
//   if (err) return console.log(err);
//   db = client.db('backlink');
//   console.log('mongo...');
//
// });

/**
 * Mongoose
 */
// arg 1: URI, 2?: options, 3: callbakc func



// async function createUser() {
//   const data = {
//     name: "Slam2",
//     age: 33
//   }
//   // 1
//   await User(data).save()
//   // 2
//   // await User.create(data)
// }
// createUser()
//
// async function findUsers() {
//   const u = await User.find()
//   console.log(u)
// }
// findUsers()









// async function getDbByRefUrl(isDo, ref) {
//   db.collection(isDo).find({
//     refUrl: ref
//   }).toArray((err, rst) => {
//     console.log(rst);
//     return rst;
//   });
// }

// app.post('/', async (req, res) => {
// let cmd = req.body;
// console.log(cmd);
//
// //let checkUrl;
// let _url = '';
// let _list = [{
//   addUrl: 'aaaaa',
//   date: '2021-20-20'
// }, {
//   addUrl: 'aaaa',
//   date: '2021-20-20'
// }];
//
// if (cmd.hasOwnProperty('add')) {
//   console.log('add add');
// }
//
// if (cmd.hasOwnProperty('url')) {
//   let u = cmd.url;
//   _url = u;
//   // console.log(u);
//   let url = new urlParser(u);
//
//   let host = url.hostname;
//   let path = url.pathname;
//
//   console.log(host);
//   console.log(path);
//   let re = host.split('.');
//
//   if (re.length < 3) {
//     host = 'www.' + host;
//   }
//   //console.log(host);
//
//   let ref = host + path;
//   console.log(ref);
//
//   await db.collection('dofollow').find({
//     refUrl: ref
//   }).toArray((err, rst) => {
//     console.log(rst);
//     _list = rst;
//   });
//
//
//
//   console.log('fff', _list);
//   res.render('index.ejs', {
//     url: _url,
//     list: _list
//   });
//
//
// }

// if (cmd === 'url') {
//   db.collection('URL'), find().toArray((err, rst) => {
//     console.log(rst);
//   });
// }

// db.collection('URL').insertOne({
//   url: req.body.url
// }, (err, rst) => {});



// res.render('index.ejs', {
//   url: _url,
//   list: _list
// });

// });
