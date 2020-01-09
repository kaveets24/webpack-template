<!-- README -->

## Quickstart

### Install the necessary dependencies.

```
$ npm install
```

### Start the development server on localhost:3000

```
$ npm run dev
```

## Notes

- While learning about Webpack, I took some notes about some of the main concepts.
- You can read the official docs for a more thorough explanation:
- https://webpack.js.org/concepts/
- https://webpack.js.org/guides/

# [Webpack](https://webpack.js.org/)
## [Core Concepts](https://webpack.js.org/concepts/)
### Entry
- An entry point determines which module Webpack should use to begin building out its internal dependency graph.
- The default entry point is src/index.js, but to specify a unique entry point, create a file called `webpack.config.js` and add the following:

```
module.exports = {
entry: "./path/to/my/entry/file.js"
}
```

### Output
- Specifies where to emit the bundles it creates and how to name these files. It will look something like:

``` 
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
### Loaders
- Out of the box, Webpack only understands JavaScript and JSON files. Loaders allow Webpack to access other file types and convert them into [modules](https://webpack.js.org/concepts/modules/) that can be consumed by your app and added to your dependency graph.

- At a high level, loaders have **2** properties that can be configured inside of your config file.
    - The **test** property identifies which file or files should be tranfsormed.
    - The **use** property says which loader should be used to transform the files.
- `webpack.config.js` should now look something like:

``` 
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
```


### Plugins
- Plugins can be leveraged to perform a wider variety of tasks such as bundle optimization, asset management and injection of environment variables. 
- Inside of `webpack.config.js`, after plugins are imported using `require()`, they need to be added to the `plugins` array.
- Since plugins can be used multiple times inside of a config file for different reasons, you'll need to create a new instance of it by using the `new` operator.
- The following example uses the the html-webpack-plugin to generate an HTML file for your application by injecting automatically all your generated bundles.

``` 
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```


### Mode
- By setting the `mode` parameter to either **production**, **development** or **none**, you can enable Webpack's built-in optimizations that correspond to each environment.  By default, the value is **production**.

### Browser Compatibility
- Webpack does not support IE8 and lower.

## Concepts
### Entry Points
- Entry points should be defined using the object syntax, which allows our config to be more scalable. 

```
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```
- For a multi-page application, as a rule of thumb, you should have one entry point per html file.

### Output
- While there can be multiple entry points, there should only be one output configuration specified. 
```
output: {
    filename: 'bundle.js',
  }
```

- If your configuration creates more than one "chunk" (i.e. has multiple entry points or uses CommonsChunkPlugin), you should use substitutions to ensure that each output / bundle filename is unique.

```
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
```
### Loaders
- Loaders are similar in a way to 'tasks' in gulp, in that they allow you to pre-process your front end assets and import them directly into your javascript module.
- Specify several loaders with a `module.rules` array inside of your webpack.config.js file.
- Loaders are executed from bottom to top, so in the example below, `sass-loader` is executed first and `style-loader` is last.
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // sass-loader
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
```
### Module Resolution
- Webpack has a `[watch](https://webpack.js.org/configuration/watch/#watch)` mode so that multiple parallel or serialized requests to the same file are cached. If watch mode is turned off, the cache gets purged before every compilation.

### Targets
- Set a deployment target in your config file to specify whether the bundle is for the front-end or the back-end (Node.js)
- 
- The following compiles for usage in a Node.js environment and ignores built in modules like fs and path.
- The default target value is `web`.

```
module.exports = {
  target: 'node'
};
```
- Webpack does not support multiple strings being passed to the target arg, but you can create an isomorphic library by bundling two libraries inside of your config file.

### [Manifest](https://webpack.js.org/concepts/manifest/)
- At each build Webpack creates a manifest that conducts the interaction of all modules.
- You can invalidate browser caching by adding a hash to the bundle name each time something changes, but note that the manifest will be different after each build, so it will seem as if something has been changed even if it hasn't. In order to setup more complex configuration for browser caching, it may or may not be necessary to better understand the inner workings of the manifest. 



# Guides
## [Asset Management](https://webpack.js.org/guides/asset-management/)
- In order to import a css file from inside your JS module you'll need to install some css loaders.
```
$ npm install --save-dev style-loader css-loader
```

- Relative imports inside of your sass files should be prepended with `./` webpack's [advanced mechanism for resolving files](https://webpack.js.org/concepts/module-resolution/)
- This approach recommends bundling your assets inside of a components folder where they are used. If you have images or utilities that are reused throughout a project, you can create a resolve.alias for them, rather than including them in every component's folder structure. https://webpack.js.org/guides/asset-management/#global-assets

## [Output Management](https://webpack.js.org/guides/output-management/)
- In this section, we'll use `HtmlWebpackPlugin` to dynamically change the name of our bundles inside of our index.html file.
- `HtmlWebpackPlugin` will automatically generate a new index.html file.
- Read more about the plugin [here](https://github.com/jantimon/html-webpack-plugin)
- Next, we'll use `clean-webpack-plugin` to clean up our `dist/` folder. It will remove any files that weren't generated when running `npm run build`.


## [Development](https://webpack.js.org/guides/development/)
- We will use an inline source-map to generate maps for debugging, but this is not recommended for production.
### webpack-dev-server
- We will use `webpack-dev-server` to not only watch for file changes like the built in `webpack --watch` command, but also refresh the browser.
- Read more about [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server)
### webpack-dev-middleware
- webpack-dev-middleware is a wrapper that emits files processed by a webpack to a server. Next, we'll see how this can be used with Express :).
- Add a `publicPath` to the output section of our config. We'll use this path in our server script as well in order to make sure files are served correctly. 
```
    output: {
     publicPath: '/',
    },
```

## [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)
- Seems the order of the guides jumped around a bit, so we'll continue with HMR.
- HMR should only be used in development, NOT production.
- If you want to use HMR with webpack-dev-middleware, you will need `webpack-hot-middleware`
- As this feature is most beneficial for app development, we'll come back to this later, but for now, it should work as intended for css files.

## [Code Splitting](https://webpack.js.org/guides/code-splitting/)
- There are 3 general approaches to code splitting:
    - Entry Points
    - Prevent Duplication: using `SplitChunksPlugin`
    - Dynamic Imports: via inline function calls within modules

### Entry Points
- Say we created another entry point and added it to our config. If both entry points required lodash, the lodash code would be duplicated inside of our bundles. This is not ideal and this is where the `SplitChunksPlugin` comes into play.

### SplitChunksPlugin
- With this plugin, we can extract common dependencies into an existing entry chunk OR an entirely new chunk. First, add:
```
   optimization: {
     splitChunks: {
       chunks: 'all',
     },
},
```

- The [`MiniCssExtractPlugin`](https://webpack.js.org/plugins/mini-css-extract-plugin/) is useful for splitting your css files from the main js bundle.
- See the [Advanced Configuration Example](https://webpack.js.org/plugins/mini-css-extract-plugin/#advanced-configuration-example) for details.
- When using the MiniCssExtractPlugin, we removed the use of `style-loader` as that plugin also injects css related tags into our index.html file.


