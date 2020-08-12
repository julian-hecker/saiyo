const fs = require('fs');
const pdf = require('pdf-parse');
const ResumeParser = require('simple-resume-parser');
const resume = new ResumeParser('./joshu.txt');
function returnJSON(){
// read PDF file
let dataBuffer = fs.readFileSync('./Scott_Simko_Resume.pdf');

// write text from PDF to .txt file
pdf(dataBuffer).then(function (data) {
  let temp = data.text;

  fs.writeFile('./joshu.txt', data.text, () => {
    console.log('file written');
  });

  resume
    .parseToJSON()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

    return data;
  });
}
module.exports = returnJSON;
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

  //   arrayTemp = temp.replace(/(\n)/g, ';').split(';');

  //   arraydel = [];

  //    // push index with whitespace on delete array
  //   for (i = 0; i < arrayTemp.length; i++) {
  //     if (arrayTemp[i].replace(/\s/g, '') === '' || arrayTemp[i] === '') {
  //       arraydel.push(i);
  //     }
  //   }
  //    // delete each index with whitespace
  //   for (i = 0; i < arraydel.length; i++) {
  //     arrayTemp.splice(arraydel[i] - i, 1);
  //   }

  //   let obj = {
  //     Name: '',
  //     Experience: '',
  //     date: '',
  //     desc: '',
  //   };
  //   console.log(arrayTemp);

  //   // finds index with 2nd word == EXPERIENCE insensitive
  //   for (i = 0; i < arrayTemp.length; i++) {
  //     if (obj.Name === '' && i == 0) obj.Name = arrayTemp[i];
  //     if (arrayTemp[i].match(/\w+(?=\s+EXPERIENCE)/gi) && obj.Experience === '') {
  //       obj.Experience = arrayTemp[i + 1];
  //       obj.desc = arrayTemp[i + 2];
  //     }
  //   }
  //   console.log(obj);

