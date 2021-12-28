"use strict"

// class를 안쓰는데
// JS는 넴스페이스가 없어서
// 창 2개 어떻게 햇어요???


function resHandle(json) {
    const err = json.err
    if (err != null) {
        alert(err)
        return
    }
    document.querySelector("form[url-form] input[url]").value = ""
    const nd = json.data
    alert("Created new Dofollow: ", nd)
}

function formSubmitHandle(evt) {
  // http formdata 전송 중지
  evt.preventDefault() // 요걸로 막는거에요
  // put, patch, delete 같은 http mathod도 있는데
  // html form tag는 method를 "get", "post"밖에 지원을 안해여
  // 그리고 이거 안하면 핸들링도 못하고
  // 페이지 전체가 이동해서
  // JS fetch 내장모듈?로  웹소켓처럼 처리해용
  const url = document.querySelector("form[url-form] input[url]").value
  // 그리고 글씨가 너무 작아요 ㅠ ㅋㅋㅋㅋ
  // 아톰 한글쓰다가 영어쓰면 오류나는거 스트레스 받아요 ㅋㅋㅋㅋ
  // 빔버전으로 쓰면 오류 안나더라구용
  const ch = "Home:addUrl" // 채널 이름은 짓기 나름이에용
  client.emit(ch, url) // msg 발송은 emit
  // 웹소켓의 장점은
  // 전송하는 데이터가 엄청 가볍고
  // 클라이언트가 서버 전송을 계속 듣고있어서
  // 주로 채팅이나 이런거 구현할때 써여 게임이나 TCP통
  // 저 너무 졸려서 ㅋㅋㅋ 이만 나가볼게용
  // client.on("") // msg 수신은 on
  // fetch("/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({url}) // key랑 value랑 이름이 같으면 그냥 이러케 써두대용 ㅋㅋ
  //     // rest를 너무 오랜만에 써서 ㅋㅋㅋㅋ 기억이안나네요
  //   })
  //   .then(res => res.json())
  //   .then(json => resHandle(json))
  //   .catch(err => console.log(err))
    // Websoket으로 하는게 좀더 편한거같더라구영 갠
    //무슨차이져?? 웹소켓으로 하면 페이지가 새로 로드되는게 아닌건가요?
    // 지금도 페이지 새로 로드안하고 하고있는데
    // 그냥 웹소켓이 더 가볍고  클라이언트에서 정보 보내기도 편하고
    // 저 fetch처럼 method, headers 같은거 없이 그냥
    // 채널만 지정해서 엔드포인트로 쏘면돼//
    // 지금 형태가 웹소켓 인가요? 아녕 요거는
    // http REST API용
}

// 대체 ㅋㅋㅋㅋ 머가문제지ㅋㅋㅋㅋ

document.querySelector("form[url-form]").addEventListener("submit", formSubmitHandle)
