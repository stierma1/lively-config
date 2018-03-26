
var Resolver = require("../resolver");
var request = require("request");

class HttpResolver extends Resolver{
  constructor(url, headers, period){
    super(period);
    this.url = url;
    this.headers = headers || {};
  }

  resolve(){
    return new Promise((res, rej) => {
      request({uri:this.url, method:"get", headers:this.headers}, (err, resp, body) => {
        if(err){
          return rej(err);
        }
        res(JSON.parse(body));
      })
    }).then((data) => {
      this.currentConfig = data;
    })
  }

}

module.exports = HttpResolver;
