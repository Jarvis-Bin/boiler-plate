const models = require("./models/index");

models.sequelize.sync().then(   () => {
    console.log("DB 연결 성공");
}).catch(err => {
    console.log("연결 실패ㅜㅠ");
    console.log(err);
})