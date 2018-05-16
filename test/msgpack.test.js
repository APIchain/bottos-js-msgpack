const msgpack = require('./msgpack')

const buf2hex = (buffer)=>{
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

describe('message pack test',()=>{
    it('PackStr16',()=>{
        let str = 'testuser'
        let pkstr16 = msgpack.PackStr16(str)
        let u32 = msgpack.PackUint32(9999)
        console.log(buf2hex(pkstr16))
    })

    it('pack array size',()=>{
        let size = msgpack.PackArraySize(3)
        console.log({size:buf2hex(size)})
    })

    it('pack object',()=>{
        let obj = {
            Didid:"t433",
            Didstr:"test"
        }

        let arrSize = msgpack.PackArraySize(2)
        let arrid = msgpack.PackStr16(obj.Didid)
        let arrStr = msgpack.PackStr16(obj.Didstr)
        let len = arrSize.byteLength + arrid.byteLength + arrStr.byteLength
        let buf = new Uint8Array()
        let arr = [arrSize,arrid,arrStr]
        let arr2 = []

        for(let i = 0;i<arr.length;i++){
           arr2.push(...arr[i])
        }

        buf = [...arr2]

        let zstr = 'dc0002da000474343333da000474657374'
        let bstr = buf2hex(buf)
        zstr == bstr ? console.log(true) :console.log(false)
        console.log({buf:buf2hex(buf)})
    })
})