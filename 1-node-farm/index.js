const fs = require('fs');


///////////////////
// Files

// // Blocking code execution
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// const textOutput = `This is what we know about the avocado: ${textInput}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log(textOutput + " \nFile written!");


// Non-blocking code execution
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('Error');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);

        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            if (err) throw err;
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
                console.log('Your file has been written');
            })
        });
    });
});
console.log('Reading file...');