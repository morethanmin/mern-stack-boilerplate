
 //NODE_ENV = local 환경에선 development라고 나오는 환경변수
 //개발환경과 배포환경 분기설정
if(process.env.NODE_ENV==="production") {
    module.exports = require('./pord'); 
} else {
    module.exports = require('./dev');
}