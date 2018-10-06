const thumbnailGenerator = require('../src');

thumbnailGenerator.setFFMpegPath('../bin/ffmpeg.exe');
thumbnailGenerator.setFFProbePath('../bin/ffprobe.exe');

thumbnailGenerator.generateThumbnails('sample.mp4', {
    outputDir: './tmp'
}).then(() => {
    console.log('Suceess');
}).catch(error => {
    console.log(error);
});