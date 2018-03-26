var path = require("path");
var LivelyConfig = require("../lib/lively-config")

var liveConfig = new LivelyConfig();

liveConfig
  .usingFile(path.join(__dirname, "/test.json"))
  .usingFile(path.join(__dirname, "../package.json"))
  .usingHttp("http://ip.jsontest.com/", {}, 60000)
  .finalize();

liveConfig.ready.then(() => {
  console.log(liveConfig.getNamedValue("name"))
  console.log(liveConfig.getNamedValue("version"))
  console.log(liveConfig.getNamedValue("ip"))
})
