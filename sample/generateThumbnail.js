const thumbnailGenerator = require('../src');
const path = require('path');

thumbnailGenerator.setFFMpegPath('../bin/ffmpeg.exe');
thumbnailGenerator.setFFProbePath('../bin/ffprobe.exe');

thumbnailGenerator.generateThumbnails('../../../../dist/sample.mp4', {
    outputDir: './tmp'
});