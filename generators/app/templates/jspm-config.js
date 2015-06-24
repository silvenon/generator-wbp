System.config({
  "baseURL": "/",
  "defaultJSExtensions": true,
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.objectRestSpread"
    ]
  },
  "paths": {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  "packages": {
    "scripts": {
<% if (includeReact) { -%>
      "defaultExtension": "jsx"
<% } else { -%>
      "defaultExtension": "js"
<% } -%>
    }
  }
});
