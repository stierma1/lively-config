
module.exports = {
  LivelyConfig: require("./lib/lively-config"),
  Resolver: require("./lib/resolver"),
  resolvers: {
    FileSystemResolver: require("./lib/resolvers/file-system-resolver"),
    HttpResolver: require("./lib/resolvers/http-resolver"),
    EnvironmentVarsResolver: require("./lib/resolvers/environment-resolver")
  }
}
