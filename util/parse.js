const fs = require('fs');
const pdf = require('pdf-parse');

// let dataBuffer = fs.readFileSync('./Hecker_Resume___Aug_2020.pdf');
// let dataBuffer = fs.readFileSync('./Ian Matlak Resume.pdf');
// let dataBuffer = fs.readFileSync('./Ian_Resume.pdf');
let dataBuffer = fs.readFileSync('./Scott_Simko_Resume.pdf');

pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log(data.numpages);
  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  //   console.log(data.text);

  temp = data.text;
  console.log(temp.replace(/(\n)/g, ';').split(';'));
  arrayTemp = temp.replace(/(\n)/g, ';').split(';');

  //   for (i = 0; i < arrayTemp.length; i++) {
  //     if (arrayTemp[i] === ' ' || '   ') {
  //       console.log(arrayTemp[i] + ' ' + true);
  //       arrayTemp.splice(i, 1);
  //     }
  //   }

  for (i = 0; i < arrayTemp.length; i++) {
    console.log(
      'this is content' + ' ' + arrayTemp[i] + (arrayTemp[i] === /\s/g)
    );
  }
});
