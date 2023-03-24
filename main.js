const express = require('express')
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');

const app = express()
const port = 3000
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(compression());
app.get('*',(req,res,next) => {
    fs.readdir('./data', function(error, filelist) {
       req.list = filelist;
       next();
    });
});

app.use('/topic',topicRouter);
app.use(indexRouter);
app.use(helmet());

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
    next();
},
    (err,req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})