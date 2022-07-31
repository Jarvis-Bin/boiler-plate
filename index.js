const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');

// register에서 User 모델을 사용하기 위함
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello World! jarvis~')
})

app.post('/register',(req, res) => {

    // 회원가입 할 때 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터 베이스에 넣어줌
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})