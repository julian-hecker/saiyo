const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('express-fileupload');
const pdf = require('pdf-parse');
const ResumeParser = require('simple-resume-parser');
const resume = new ResumeParser('../temp/resume.txt');

router.get('/', function (req, res, next) {
    return res.render('index');
});

router.get('/upload', (req, res) => {
    return res.render('upload');
});

router.post('/upload', upload(), (req, res) => {
    // https://www.npmjs.com/package/express-fileupload
    //   req.files.resume
    pdf(req.files.resume).then(function (data) {
        console.log(Object.entries(data));
        fs.writeFileSync('../temp/resume.txt', data.text, () => {
            console.log('file written');
        });

        resume
            .parseToJSON()
            .then((data) => {
                console.log(data.parts);
                return res.json(data.parts);
                // return res.render('verify', data.parts);
            })
            .catch((error) => {
                console.log(error);
                return res.render('verify', { message: error });
            });
    });
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
