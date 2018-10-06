const { spwanProcess } = require('./execute');
const path = require('path');

module.exports = function () {
    let ffprobe = 'ffprobe';
    let ffmpeg = 'ffmpeg';

    let getVideoResolution = (path) => {
        return new Promise((res, rej) => {
            spwanProcess(ffprobe, `-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${path}`.split(' '))
                .then((output) => {
                    let resolutionArr = output.replace('\r\n', '').split('x');

                    res({
                        width: parseInt(resolutionArr[0]),
                        height: parseInt(resolutionArr[1])
                    });
                }).catch((code, message) => {
                    console.log(`Process exit with code ${code}: ${message}`);
                    rej(message);
                });
        });
    }

    let generateThumbnails = (videoPath, options) => {
        let imageWidth = 200;
        let imageHeight = 125;
        let outputFileName = 'out%d.png';

        if (options) {
            imageWidth = options.imageWidth || imageWidth;
            imageHeight = options.imageHeight || imageHeight;

            if (options.outputDir) {
                outputFileName = path.join(options.outputDir, outputFileName)
            }
        }

        return new Promise((res, rej) => {
            spwanProcess(ffmpeg, ['-i', videoPath, '-vf', `fps=1, scale=${imageWidth}:${imageHeight}`, outputFileName])
                .then((output) => {
                    res(output);
                }).catch((code, stdout, stderr) => {
                    if (code === 0) {
                        return res(stdout);
                    }

                    rej(stderr);
                })
        })
    }

    let setFFProbePath = (path) => {
        ffprobe = path;
    }

    let setFFMpegPath = (path) => {
        ffmpeg = path;
    }

    return {
        getVideoResolution,
        generateThumbnails,
        setFFProbePath,
        setFFMpegPath
    }
}();