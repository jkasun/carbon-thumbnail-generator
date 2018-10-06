const { spawn } = require('child_process');

let spwanProcess = (processDir, args) => {
    let output = '';
    let errOut = '';

    let process = spawn(processDir, args);

    return new Promise((res, rej) => {
        process.stdout.on('data', (data) => {
            output += data;
        });
        
        process.stderr.on('data', (data) => {
            errOut += data;
        });

        process.on('close', (code) => {
            if (errOut !== '') {
                return rej(code, output, errOut);
            }

            return res(output);
        });
    });
};

module.exports.spwanProcess = spwanProcess;