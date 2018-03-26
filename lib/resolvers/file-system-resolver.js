
var Resolver = require("../resolver");
var fs = require("fs");

class FileSystemResolver extends Resolver{
  constructor(filePath, period){
    super(period);
    this.filePath = filePath;
  }

  resolve(){
    return new Promise((res, rej) => {
      fs.readFile(this.filePath, "utf8", (err, data) => {
        if(err){
          return rej(err);
        }
        res(JSON.parse(data));
      })
    }).then((data) => {
      this.currentConfig = data;
    })
  }

}

module.exports = FileSystemResolver;
