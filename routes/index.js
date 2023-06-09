var express = require('express')
var router = express.Router();




const template = require("../lib/template");
router.get('/', (req, res) => {
    console.log(req.list);
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}
            <img src="/images/image01.jpg" style="width : 400px; display:block;"/>`,
        `<a href="/topic/create">create</a>`
    );
    res.send(html);
})

module.exports = router;