module.exports = getYoutubeVideoThumbnail
export {}
function getYoutubeVideoThumbnail(url: string, size: string) {
    if (url === null) {
        return '';
    }
    size    = (size === null) ? 'big' : size;
    let results = url.match('[\\?&]v=([^&#]*)');
    let video   = (results === null) ? url : results[1];

    if (size === 'small') {
        return 'http://img.youtube.com/vi/' + video + '/2.jpg';
    }
    return 'http://img.youtube.com/vi/' + video + '/0.jpg';
};

