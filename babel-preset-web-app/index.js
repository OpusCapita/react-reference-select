module.exports = {
  plugins: [
    "transform-decorators-legacy",
    "transform-import-styles", // transform css/less imports
    [
      // if we need only `svg` then we can do with https://www.npmjs.com/package/babel-plugin-inline-svg
      "inline-import", {
        extensions: [
          ".svg", // transform `import icon from '@oc/icons/icon.svg'` to `var icon = '<svg>...'`
        ]
      }
    ]
  ],
  presets: [
    [
      // transpile according to list of supported browsers
      "env", {
        targets: {
          browsers: ["last 2 versions", "ie >= 11", "safari >= 7", "Firefox ESR"]
        }
      }
    ],
     // support latest JS features // arguable // can be more specific, for example instead of adding `stage-0`
     // we can add more granular mixins, like `transform-object-rest-spread`, etc. to support only a limited set
     // of features out of the box
    "stage-0"
  ]
}
