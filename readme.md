**LUZZU RANKING EVALUATION**
    

AURELIA - CLI Settings:
```
    Platform: Web
    Bundler: Webpack
    Loader: None
    Transpiler: Babel
    Markup Processor: Minimal Minification
    CSS Processor: None
    Unit Test Runner: Jest
    Integration Test Runner: None
    Editor: Visual Studio Code
    Features: None

    Generated: 06.03.19
```


----------------------------------------------

First time install
- cd into folder
- npm install (you must have node.js installed on your system)
- you might also need to install this (npm install aurelia-cli -g)

Build for development
- cd into folder
- au run --watch
- go to localhost:8080 
  - note: ATM will produce error due to CORS and mixing HTTP and HTTPS on local machine -> works on server though

Build for production
- au build --env prod
- copy contents of dist folder into var/www/html/irc

more info: https://aurelia.io/docs/cli/basics#creating-a-new-aurelia-project