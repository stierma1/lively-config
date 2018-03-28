
var Resolver = require("../resolver");

class ObjectResolver extends Resolver{
  constructor(object, period){
    super(period);
    this.object = object;
    this.currentConfig = this.object;
  }

  resolve(){

    return Promise.resolve(this.object).then((data) => {
      this.currentConfig = data;
    })
  }

}

module.exports = ObjectResolver;
