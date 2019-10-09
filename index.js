const Modbus = require("hnq-modbusrtu").Modbus,
    __findRc = require('find-remove'),
    __express = require('express'),
    __m = require('moment'),
    __fs = require('fs'),
    fileManager = require('express-file-manager'),
    _cf = JSON.parse(__fs.readFileSync('./config/app.json', 'utf8')) || {};

let arrhnq,__app = __express(),
    _port = _cf.port || 8080;

__app.use(__express.static('./client'));
__app.get('/', (req, res) => res.send('Hello World!'));
__app.use('/logs', fileManager('./logs'));
__app.listen(_port, () => { _cf.debug && console.log(`App listening on port ${_port}!`) });
__app.get('/realdata', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(arrhnq))
});
var modbus = new Modbus(_cf.serialport, {}, function (err) {
setInterval(function(){getdata(modbus)}, _cf.delay)});

async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}
async function readmodbus(add, m) {
   return new Promise(function(resolve, reject) {
        m[add.fun].apply(m, add.reg.concat(function(err, data) {
            if (!err){
                resolve(data[0]);
            }else{
                reject(err);
            }
        }))
      })
}
async function getdata(m){
    var  arr = [],
        regs = [{'reg': [5,3001,2],fun: 'f0x0332'},
                {'reg': [5,3003,2],fun: 'f0x0332'},
                {'reg': [5,3009,2],fun: 'f0x0332'},
                {'reg': [5,3019,2],fun: 'f0x0332'},
                {'reg': [5,3021,2],fun: 'f0x0332'},
                {'reg': [5,3023,2],fun: 'f0x0332'},
                {'reg': [5,3025,2],fun: 'f0x0332'},
                {'reg': [5,3027,2],fun: 'f0x0332'},
                {'reg': [5,3029,2],fun: 'f0x0332'},
                {'reg': [5,3031,2],fun: 'f0x0332'},
                {'reg': [5,3035,2],fun: 'f0x0332'},
                {'reg': [5,3053,2],fun: 'f0x0332'},
                {'reg': [5,3055,2],fun: 'f0x0332'},
                {'reg': [5,3057,2],fun: 'f0x0332'},
                {'reg': [5,3059,2],fun: 'f0x0332'},
                {'reg': [5,3061,2],fun: 'f0x0332'},
                {'reg': [5,3063,2],fun: 'f0x0332'},
                {'reg': [5,3065,2],fun: 'f0x0332'},
                {'reg': [5,3067,2],fun: 'f0x0332'},
                {'reg': [5,3069,2],fun: 'f0x0332'},
                {'reg': [5,3071,2],fun: 'f0x0332'},
                {'reg': [5,3073,2],fun: 'f0x0332'},
                {'reg': [5,3075,2],fun: 'f0x0332'},
                {'reg': [5,3109,2],fun: 'f0x0332'},
                {'reg': [5,3203,2],fun: 'f0x0332'},
                {'reg': [5,2999,2],fun: 'f0x0332'}],
        logfile = "./logs/" + __m().format('YYYY_MM_DD') + ".csv"
     for (var i = 0; i < regs.length; ++i){
         arr.push(await readmodbus(regs[i],m))
     }
     __findRc('./logs', {prefix: __m().subtract(1,"years").format('YYYY_MM_')})
     if (__fs.existsSync(logfile)) {
         __fs.appendFile(logfile,  __m().format('YYYY-MM-DD HH:mm:ss') + "," + arr + '\r\n', function (err) {})
     }
     else {
         __fs.writeFile(logfile, 'datatime,I1,I2,I3,Iavg,V12,V23,V13,VLL,V1,V2,V3,VLN, kW1,kW2,kW3,kW,kVAR1,kVAR2,kVAR3,kVAR,kVA1,kVA2,kVA3,kVA,Hz,kWH \r\n', function (err) {
            __fs.appendFile(logfile,  __m().format('YYYY-MM-DD HH:mm:ss') + "," + arr + '\r\n', function (err) {})
         })
     }
     arrhnq = arr
}
