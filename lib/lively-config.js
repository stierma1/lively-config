var FileSystemResolver = require("./resolvers/file-system-resolver");
var HttpResolver = require("./resolvers/http-resolver");
var EnvironmentVarsResolver = require("./resolvers/environment-resolver");
var ObjectResolver = require("./resolvers/object-resolver");

class LivelyConfig{
  constructor(){
    this.resolvers = [];
    this.finalized = false;
    this._def = null;
    this.isReady = false;
    this.ready = new Promise((res, rej) => {
      this._def = res;
      this.isReady = true;
    })
    this._readyInterval = null;
  }

  using(resolver){
    if(this.finalized){
      throw new Error("Config already finalized cannot add resolver");
    }
    this.resolvers.push(resolver);
    return this;
  }

  usingObject(object, interval){
    return this.using(new ObjectResolver(object, interval));
  }

  usingFile(filePath, interval){
    return this.using(new FileSystemResolver(filePath, interval));
  }

  usingHttp(url, headers, interval){
    return this.using(new HttpResolver(url, headers, interval));
  }

  usingEnvironmentVars(interval){
    return this.using(new EnvironmentVarsResolver(interval));
  }

  finalize(){
    this.finalized = true;
    this._readyInterval = setInterval(() => {
      var hasNotResolved = false;
      for(var i in this.resolvers){
        if(!this.resolvers[i].hasResolved){
          hasNotResolved = true;
        }
      }
      if(!hasNotResolved){
        clearInterval(this._readyInterval);
        this._def();
      }
    }, 75);
    return this;
  }

  getNames(){
    var names = [];
    var found = {};

    for(var i in this.resolvers){
        var resNames = this.resolvers[i].getNames();
        for(var j in resNames){
          if(!found[resNames[j]]){
            found[resNames[j]] = true;
            names.push(resNames[j]);
          }
        }
    }

    return names;
  }

  getMaybeNamedValue(name){
    for(var i in this.resolvers){
      var maybeValue = this.resolvers[i].getMaybeNamedValue(name);
      if(maybeValue != null){
        return maybeValue;
      }
    }

    return null;
  }

  getNamedValue(name){
    for(var i in this.resolvers){
      var maybeValue = this.resolvers[i].getMaybeNamedValue(name);
      if(maybeValue != null){
        return maybeValue.value;
      }
    }

    return null;
  }

  snapshot(){
    var names = this.getNames();
    var snap = {};
    for(var i in names){
      var maybeValue = this.getMaybeNamedValue(names[i]);
      if(maybeValue){
        snap[names[i]] = maybeValue.value;
      }
    }
    var liveConfig = new LivelyConfig();

    return liveConfig.usingObject(snap).finalize();
  }

}

module.exports = LivelyConfig;
