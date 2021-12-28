"use strict"

function hub(server) {
    server.on("connection", (socket) => {
        socket.on("Home:addUrl", async (msg) => {
            try {
                // post 메소드 로직 여기다가 넣으시면 돼여
            } catch (e) {

            }
            console.log(msg)
        })
    })
}
//뷰나 리액트가 웹소켓 방식인가여?
// 결과는 지금 이렇게 쓰는거랑 다르지않아요 웹소켓으로 작동하겟죵?
// 뷰나 리액트는
// 저는 서버소스는 서버소스만
// 에이치엠엘은 에이치티엠엘만   씨에스에스는 씨에스에스만
// 분류해서 작성하는게 좋아서  안쓰는거같아용 ㅋㅋㅋ
module.exports.hub = hub
