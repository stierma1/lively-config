
class Resolver{
  constructor(refreshPeriod){
    this.refreshPeriod = refreshPeriod || null;
    this.currentConfig = {};
    this._currentResolveInterval = (this.refreshPeriod === null || this.refreshPeriod === undefined) ? null : (setInterval(function(){
      this.resolve();
    }.bind(this), this.refreshPeriod));
    this.hasResolved = false;
    setTimeout(() => {
      Promise.resolve(this.resolve())
        .then(() => {
          this.hasResolved = true;
        }).catch((e) => {
          this.hasResolved = true;
        });
    },0)

  }

  getValues(){
    return this.currentConfig;
  }

  getNamedValue(name){
    return this.currentConfig[name];
  }

  getNames(){
    return this.currentConfig.keys();
  }

  getMaybeNamedValue(name){
    if(this.currentConfig.hasOwnProperty(name)){
      return {
        value: this.currentConfig[name]
      };
    } else {
      return null;
    }
  }

  resolve(){
    throw new Error("Resolve Todo");
  }

  destroy(){
    if(this._currentResolveInterval){
      clearInterval(this._currentResolveInterval);
    }
    this.currentConfig = {};
  }

  reset(){
    this.currentConfig = {};
    this.hasResolved = false;
    Promise.resolve(this.resolve())
      .then(() => {
        this.hasResolved = true;
      }).catch((e) => {
        this.hasResolved = true;
      })
  }
}

module.exports = Resolver;
