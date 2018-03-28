# lively-config

## Usage
```js
var path = require("path");
var LivelyConfig = require("lively-config").LivelyConfig

var liveConfig = new LivelyConfig();
/*
Order matters
liveConfig.using(... Highest Resolution Priority ...)
          .using(... Lower Resolution Priority ...)
          ...
          .using(... Lowest Resolution Priority ...)
          .finalize()
*/
liveConfig
  .usingEnvironmentVars()
  .usingFile(path.join(__dirname, "/test.json"))
  .usingHttp("http://ip.jsontest.com/", {}, 60000)
  .usingObject({"test":"config"})
  .finalize();

liveConfig.ready.then(() => {
  console.log(liveConfig.getNamedValue("name"))
  console.log(liveConfig.getNamedValue("ip"))
})
```



### LivelyConfig Properties

#### ready
A promise created on construction that resolves after finalize has been invoked and all resolvers have resolved at least once.

### LivelyConfig Methods

#### getNames()
Returns an Array of all the key names in LivelyConfig

#### getNamedValue(String name)
Returns the value of the given key name.  If no value is found null will be returned

#### getMaybeNamedValue(String name)
Returns a wrapped value of the given key name. ({value: foundValue...}) If no value is found null will be returned

#### snapshot()
Returns a livelyConfig clone that contains a snapshot of all current configs.

#### usingEnvironmentVars(Optional<Number> interval)
Adds a EnvironmentVarsResolver with given config file to the LivelyConfig and will poll the environment vars if interval is given

#### usingFile(String filePath, Optional<Number> interval)
Adds a FileSystemResolver with given config file to the LivelyConfig and will poll the file if interval is given

#### usingHttp(String url, Object Headers, Optional<Number> interval)
Adds a HttpResolver and will call the url with headers and will poll the file if interval is given

#### usingObject(Object config, Optional<Number> interval)
Adds an ObjectResolver and use the provided config objects

#### finalize()
Locks the Resolvers list and will trigger the ready promise after all resolvers have resolved at least once

#### using(Resolver resolver)
Adds a resolver to the LivelyConfig

### Resolver (abstract)
Resolvers are how configs are loaded into the LivelyConfig, out of the box there are 2 concrete implementations (FileSystemResolver and HttpResolver), you can make your own by inheriting from the Resolver Class provided and implementing a resolve method.
