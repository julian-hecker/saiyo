var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    return res.render('index');
});

router.get('/form', (req, res) => {
    return res.render('form');
});

router.get('/preview', (req, res) => {
    return res.sendFile(compileResume({ title: 'reee' }));
});

router.get('/download', (req, res) => {
    return res.download(compileResume({ title: 'reee' }));
});

function compileResume(data) {
    const hb = require('handlebars');
    const fs = require('fs');
    const path = require('path');

    const templateUrl = path.join(__dirname, '../views/template.hbs');
    const template = fs.readFileSync(templateUrl, {
        encoding: 'utf-8',
        flag: 'r',
    });
    const compiledUrl = path.join(__dirname, '../temp/resume.html');
    const compiled = hb.compile(template);
    const html = compiled(data);

    fs.writeFileSync(compiledUrl, html);

    return compiledUrl;
}

module.exports = router;
