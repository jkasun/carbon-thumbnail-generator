const fs = require('fs');
const path = require('path');

function mkDirByPathSync(targetDir) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') {
                return curDir;
            }
            
            if (err.code === 'ENOENT') {
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;

            if (!caughtErr || caughtErr && targetDir === curDir) {
                throw err;
            }
        }

        return curDir;
    }, initDir);
}

module.exports.mkDirByPathSync = mkDirByPathSync;