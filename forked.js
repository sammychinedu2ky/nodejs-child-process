const compute = (init) => {
    
    let total = 0;
    for (let i = init; i <1e9; i++) {
                total += i
    }
  console.log(total)
    return `sum from ${init} is ${total}`
}

process.on('message', (msg) => {
    val = compute(msg);
   
    process.send(val)
})