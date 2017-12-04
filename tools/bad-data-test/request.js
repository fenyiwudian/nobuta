const https = require('https');
const http = require('http');
const qs = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.post = (options, data) => {
    return new Promise(resolve => {
        const postData = qs.stringify(data || null);
        options.method = 'POST';
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', d => {
                data += d;
            });
            res.on('end', () => {
                resolve(data);
            });
        });
        req.write(postData);
        req.end();
    });
};


exports.get = (url, data) => {
    return new Promise(resolve => {
        url = `${url}?${qs.stringify(data)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', d => {
                data += d;
            });
            res.on('end', () => {
                resolve(data);
            });
        });
    });
};



