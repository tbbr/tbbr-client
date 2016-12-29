module.exports = function(deployTarget) {
    var ENV = {
        build: {},

        s3: {
            accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
            secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
            bucket: 'tbbrassets',
            region: 'us-east-1'
        },
        's3-index': {
            accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
            secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
            bucket: 'tbbrassets',
            region: 'us-east-1'      
        }
    }
    return ENV
}