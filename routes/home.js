// 1
const express = require("express")
const r = express.Router()
// 2
// const {Router} = require("express")
// const r = Router()

// import DB models
const Dofollow = require("../models/Dofollow")

function serverError(e) {
  console.log(e)
  res.send("Server error")
}

r.get('/', async (req, res) => {
  // const moment = req.app.get("moment")
  // 외부랑 통신할 경우 반드시 어씽크 어웨잇
  // 외부랑 통신 할 경우 에러 핸들링 해야해서 try catch로 꼭 감싸줘야해여
  // 안그럼 서버 패닉나요

  // 그것보다 지금

  try {
    // 생성
    // schema에서 unique사용 하는것보다 (에러를 반환하기때문에)
    // 한번 서치후 이미 존재하면 핸들링 하는게 좋아여
    // await new Dofollow({
    //   refUrl: "http://test.com",
    //   addUrl: "http://test.com/post1"
    // }).save()
    // JS도 create가 되는지 모르겟네여
    // await Dofollow.create({
    //   refUrl: "http://hello.world",
    //   addUrl: "http://hello.world/post/2"
    // }) // 이때 혹시 date 를 임의값 넣을수 있나여??
    // // 되네여

    // 전체검색
    // length == 0 이면 [] 반환
    // const ds = await Dofollow.find()
    // console.log(ds)

    // for (let item of ds) {
    //   const date = moment(item.date).format("YYYY년 MM월 DD일 HH:mm")
    //   console.log(date) // 아 디비에 저장된 시간인거져?? 난 지금 시간인줄.. ㅋㅋ  네네
    // }

    // const now = moment()
    // const unixTimestamp = now.unix()
    // console.log(unixTimestamp) //이걸로 시계처럼 계속 변하게도 되나여??
    // 웹브라우저 클라이언트 JS 파일 안에서 쓰실려면 CDN으로 해야돼여
    // "" 안에 YYYY연도 MM월 DD일  HH 24시간 hh 12시간 mm 분 ss 초 / a 오전 또는 오후
    // "" LLL LL 등등
    // const format = now.format("LLL")
    // console.log(format)
    // moment CDN도 있어요. 저는 서버에서 그냥 디비에있는 Date 타입으로 보내고
    // 클라이언트에서 그떄그때 맞는폼으로 변환 해여
    // 이렇게도 되낭?

    // 1개만 검색
    // 없으면 null 반환(undefined 아니에요)
    // const d = await Dofollow.findOne({
    //   refUrl: "http://test.com"
    // })
    // console.log(d)
    //res.send('connect ok');
    //res.sendFile(__dirname + '/index.html');
    // res.render('index.ejs', {
    // url: '',
    // list: {}
    // });
    res.render("index", {
      // ds: ds   (.. same
      // ds,
      // d,
      url: '',
      list: {},
      // moment // 함수도 보냈었던것같은데
    })
  } catch (e) {
    serverError(e)
  }
});

r.post("/", async (req, res) => {
    const url = req.body.url
    if (url == undefined) {
        res.json({
        err: "body.url is not found",
        data: ""
        })
        return
    }
    const isProtocol = ((url) => {
        if (url.includes("http://") == true) {
            return true // d왠지 includes 가 인덱스 반환이??
            // indexOf가 자리 반환해줘용 인크루드스는 불린이용
        }
        if (url.includes("https://") == true) {
            return true
        }
        return false
    })(url)

    if (isProtocol == false) {
        res.json({
            err: "please include http protocol",
            data: ""
        })
        return
    }
    try {
        // 없으면 null 반환
        const d = await Dofollow.findOne({refUrl: url})
        if (d != null) {
            res.json({
                err: `"${url}" exist`,
                data: ""
            })
            return
        }
        // await Dofollow.create({
        //     refUrl: url,
        //     addUrl: "empty"
        // })
        const newDofollow = await new Dofollow({
            refUrl: url,
            addUrl: "Empty"
        }).save()
        res.json({
            err: null,
            data: newDofollow
        })
    } catch (e) {
        serverError(e)
    }
})

module.exports = r
