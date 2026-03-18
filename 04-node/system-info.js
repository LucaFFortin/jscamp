import os from "node:os"
import ms from "ms"

// console.log(os)
console.log(os.arch())
console.log(os.totalmem() / 1024 / 1024 / 1024)
console.log(os.freemem());
console.log(os.type())
console.log(os.release());
console.log(os.platform());
console.log("Tiempo total de uso:", ms(os.uptime() * 1000, { long: true }));

