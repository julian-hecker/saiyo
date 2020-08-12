const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('express-fileupload');
const pdf = require('pdf-parse');
const ResumeParser = require('simple-resume-parser');
const resume = new ResumeParser('/tmp/resume.txt');

router.get('/', (req, res) => {
    return res.render('index');
});

router.get('/upload', (req, res) => {
    return res.render('upload');
});

router.post('/upload', upload(), (req, res) => {
    // https://www.npmjs.com/package/express-fileupload
    pdf(req.files.resume).then(function (data) {
        // console.log(Object.entries(data));
        fs.writeFileSync('/tmp/resume.txt', data.text, () => {
            console.log('file written');
        });

        resume
            .parseToJSON()
            .then((data) => {
                // return res.json(data.parts);
                return res.render('verify', { data: data.parts });
            })
            .catch((error) => {
                console.log(error);
                return res.render('verify', { message: error });
            });
    });
});

// post with query params, render select
router.get('/verify', (req, res) => {
    return res.render('select', req.query);
});

router.get('/preview/:template', (req, res) => {
    console.log(req.query);
    const template = 'template' + req.params.template;
    return res.sendFile(compileResume(template, { data: req.query }));
});

router.get('/download/:template', (req, res) => {
    const template = 'template' + req.params.template;
    return res.download(
        compileResume(template, { data: req.query }),
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
