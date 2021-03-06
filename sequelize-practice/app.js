const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const getPersonRouter = require('./routes/getperson');
const findPersonRouter = require('./routes/findperson');
const logger = require('morgan');
const {sequelize} = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

sequelize.sync();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));


app.use('/',indexRouter);
app.use('/getperson',getPersonRouter);
app.use('/findPerson',findPersonRouter);

app.use((req,res,next)=>{
    res.status(404).send('일치하는 주소가 없습니다.');
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('500 서버에러!');
});

app.listen(3000,()=>{
    console.log("3000번 포트에서 서버 대기중입니다!");
});