var express = require('express');
var router = express.Router();

var JSONobj = require('../util/parse.js')

router.get('/', function (req, res, next) {
    return res.render('index');
});

router.get('/upload', (req, res) => {
    return res.render('upload');
});

router.get('/verify', (req, res) => {
  return res.render('verify', );
});

router.post('/form', (req, res) => {
    console.log('reee');
    res.end();
});


router.get('/preview/:template', (req, res) => {
    const template = 'template' + req.params.template;
    return res.sendFile(compileResume(template, { title: 'reee' }));
});

router.get('/download/:template', (req, res) => {
    const template = 'template' + req.params.template;
    return res.download(compileResume(template, { title: 'reee' }), 'index.html');
});

function compileResume(template, data) {
    const hb = require('handlebars');
    const fs = require('fs');
    const path = require('path');

    const templateUrl = path.join(__dirname, `../views/${template}.hbs`);
    const templateFile = fs.readFileSync(templateUrl, {
        encoding: 'utf-8',
        flag: 'r',
    });
    const compiledUrl = path.join(__dirname, '../temp/resume.html');
    const compiled = hb.compile(templateFile);
    const html = compiled(data);

    fs.writeFileSync(compiledUrl, html);

    return compiledUrl;
}

module.exports = router;
