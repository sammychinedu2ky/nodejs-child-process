http = require('http2');
const url = require('url');
const { fork } = require("child_process");
const server = http.createServer();
server.on("request", (req, res) => {
    if (url.parse(req.url).pathname == '/calculate') {
        let queryString = parseInt(url.parse(req.url, true).query.val)
        if (typeof queryString == 'number') {
            let val = url.parse(req.url, true).query.val;
            const calculate = fork('forked.js');
            calculate.send(parseInt(val));
            calculate.on('message', sum => {
                res.end(`${sum}`)
            })
        }
        else {
            res.end('ok')
        }
    }
    else if (url.parse(req.url).pathname == '/norm') {
        let queryString = parseInt(url.parse(req.url, true).query.val)
        if (typeof queryString == 'number') {
            let val = url.parse(req.url, true).query.val;
            const compute = (init) => {
                let total = 0;
                for (let i = init; i < 1e9; i++) {
                    total += i
                }
                return total
            }
            sum = compute(parseInt(val))
            res.end(`sum from ${val} is ${sum}`)
        }
        else {
            res.end('ok')
        }
    }
    else res.end("didn't use the path)")
})
server.listen(8080, (err, port) => {
    if (err) console.log(err)
    else console.log(err)
});