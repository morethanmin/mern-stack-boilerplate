//다음과 같이 하고 헤로쿠에서 MONGO_URL로 값을 넣어주면 값을 받아올 수 있다.

module.exports ={
    mongoURL: process.env.mongoURL,
    localURL: 'https://boilerplate-forntend.herokuapp.com',
    PORT: process.env.PORT,
    option:{secure: true, sameSite: "None"}

}