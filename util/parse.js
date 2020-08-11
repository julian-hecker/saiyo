const fs = require('fs');
const pdf = require('pdf-parse');

// let dataBuffer = fs.readFileSync('./Hecker_Resume___Aug_2020.pdf');
// let dataBuffer = fs.readFileSync('./Ian Matlak Resume.pdf');
// let dataBuffer = fs.readFileSync('./Ian_Resume.pdf');
let dataBuffer = fs.readFileSync('./Scott_Simko_Resume.pdf');

pdf(dataBuffer).then(function (data) {
  // // number of pages
  // console.log(data.numpages);
  // // number of rendered pages
  // console.log(data.numrender);
  // // PDF info
  // console.log(data.info);
  // // PDF metadata
  // console.log(data.metadata);
  // // PDF.js version
  // // check https://mozilla.github.io/pdf.js/getting_started/
  // console.log(data.version);
  // //  PDF text
  // console.log(data.text);

  let temp = data.text;
  arrayTemp = temp.replace(/(\n)/g, ';').split(';');

  arraydel = [];

  for (i = 0; i < arrayTemp.length; i++) {
    if (arrayTemp[i].replace(/\s/g, '') === '' || arrayTemp[i] === '') {
      arraydel.push(i);
    }
  }

  for (i = 0; i < arraydel.length; i++) {
    arrayTemp.splice(arraydel[i] - i, 1);
  }

  let obj = {
    Name: '',
    Experience: '',
    date: '',
    desc: '',
  };
  console.log(arrayTemp);

  for (i = 0; i < arrayTemp.length; i++) {
    if (obj.Name === '' && i == 0) obj.Name = arrayTemp[i];
    if (arrayTemp[i].match(/\w+(?=\s+EXPERIENCE)/gi) && obj.Experience === '') {
      obj.Experience = arrayTemp[i + 1];
      obj.desc = arrayTemp[i + 2];
    }
  }
  console.log(obj);
});
