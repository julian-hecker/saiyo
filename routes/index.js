const express = require('express');
const router = express.Router();

const upload = require('express-fileupload');

router.get('/', function (req, res, next) {
    return res.render('index');
});

router.get('/upload', (req, res) => {
    return res.render('upload');
});

router.post('/upload', upload({useTempFiles: true, tempFileDir: '../temp'}), (req, res) => {
    // https://www.npmjs.com/package/express-fileupload
    console.log(req.files.resume);



    return res.render('verify');
});

// render verify with details from analzed form
router.post('/verify', (req, res) => {
    res.render('verify', {});
});

// post with query params, render select

router.get('/preview/:template', (req, res) => {
    const template = 'template' + req.params.template;
    return res.sendFile(compileResume(template, { title: 'reee' }));
});

router.get('/download/:template', (req, res) => {
    const template = 'template' + req.params.template;
    return res.download(
        compileResume(template, { title: 'reee' }),
        'index.html',
    );
});

function compileResume(template, data) {
    const hb = require('handlebars');
    const fs = require('fs');
    const path = require('path');

    const templateUrl = path.join(
        __dirname,
        `../views/${template}.hbs`,
    );
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
