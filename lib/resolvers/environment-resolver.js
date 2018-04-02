
var Resolver = require("../resolver");

class EnvironmentVarsResolver extends Resolver{
  constructor(period){
    super(period);
    this.currentConfig = process.env;
  }

  resolve(){
    return Promise.resolve(process.env).then((data) => {
      this.currentConfig = data;
    })
  }

}

module.exports = EnvironmentVarsResolver;
