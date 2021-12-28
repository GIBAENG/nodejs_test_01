// 1
const mongoose = require("mongoose")
// 2
// const {Schema, model} = require("mongoose")
// const DofollowSchema = Schema(code ..)

// 여기서 선언한 스키마 모양으로만 데이터 쓰고 읽고 수정하고 삭제할 수있어용.
const DofollowSchema = mongoose.Schema({
  // 생성할떄 date 입력 안하면 자동으로 현재시간으로 저장돼여
  date: {
    type: Date,
    default: Date.now // default option 넣으시면
  },
  // required: true  데이터 생성시 꼭 입력해야하는 것
  refUrl: {
    type: String,
    required: true,
    unique: true // 중복 방지
  },
  addUrl: {
    type: String,
    required: true
    // required 없을때  default: "http://hello.com" 하면 요걸로 자동으로 생성돼여. 값 넣으면 넣은 값으로 ㅎ
  }
})

//                         collection name, Schema
// 네 이거네용 ㅋㅋㅋ 컬렉션 뒤에 복수로 설정하는게 국룰이에용
// 몽구스 쓰시면 그냥 Dofollow로 적어도 데이터베이스서버에는 Dofollows로 저장돼여
// 컬렉션 네이밍할때 s 붙이라는 말이져?? 넵
// 파일 익스포츠,  몽구스.모델로  콜렉션 네임지정하고, 스키마 넣고
// 다른 파일에서 불러와서 쓰는거에용  // 이렇게죠?
// 이렇게 해도 dofollows 컬렉션을 불러올거에요 아마도 // 왜지.. 왜 있는 기능이져..
// 컬렉션이라서 복수 개념이라서 그냥 강제로 복수로 만들어여 ㅋㅋㅋㅋ 복사 붙어넣기 없네요.. ㅋㅋ
// dofollows로 하셔야대여  sql처럼 행열이 아니라
// collection안에 데이터 한묶음이 각각 개체라서 컬렉션이름을 복수로 하셔야대여
// 컬렉션 이름 바꾸거나, 안에 있는 데이터를 다른 컬렉션에 이동할수 있나요? 몽고 클라이언트나 웹에서?
// 그래본 적이 없는거같아여  스키마 생성하고 컬렉션 설정할때는 거의 테스트단계여서 이름잘못되거나 ㅋㅋㅋ 그러면 그냥 드롭하고 다시 만들었던거같아여
// 오 되네여 ㅋ.
module.exports = mongoose.model("dofollows", DofollowSchema)