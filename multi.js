const http2 = require('http2');
const { performance, } = require('perf_hooks');
let init = performance.now();

(() => {
    console.log(`the performance starts at ${init}`)
    for (i = 0; i < 300; i++) {
        print(i)
    }
})()


function print(val) {
    try {
        const client = http2.connect('http://localhost:8080');

        client.on('error', (err) => console.error(err));

        console.log(`me val is ${val}`)
        const req = client.request({ ':path': `/calculate?val=${val}` });
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => {
            console.log(`\n${data}`);
            client.close();
            let final = performance.now();
            console.log(`The final is ${(final - init) / 1000} seconds`)
        });

    } catch (error) {
        console.log(error)
    }
}

