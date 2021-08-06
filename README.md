# React, Redux, Puppeteer SSR
Here is a SPA with two routes that shows todo-lists:
* /local asks for local server
* /remote asks for JSON-placeholder API

That SPA was SSR-ed via Puppeteer:
- When user go to 4000 port, NodeJS opens Puppeteer and opens the SPA inside of it
- After all requests are made NodeJS calls (on the page in puppeteer) the Redux store serialization into an element with [data-redux-store-state] attribute
- NodeJS receives the final HTML and sends it to the client
- Before hydration, client tries to prefill redux-state from the element with [data-redux-store-state] attribute

> All important parts are reflected in comments with [SSR] tag

# What to notice
## SPA
* Visit http://localhost:8080/local
* Notice no HTML present in initial document
* Notice first call for /local todos (http://127.0.0.1:4001/)

## SSR
* Visit http://localhost:4000/local
* Notice HTML is present in initial document
* Notice Redux State is present in initial document (serialized in one of the \<body> children)
* Notice there is no network call for /local todos (like http://127.0.0.1:4001/)
## NPM commands

| npm run ...                | Description                                                            |
| ---------------------------| ---------------------------------------------------------------------- |
| start                      | (required) Starts an SPA App (it also will be visited by puppeteer)    |
| ssr:start                  | (required) Starts SSR-server on port 4000, also serves static files    |
| local-server:start         | (required) Starts NodeJS server to answer on /local todos requests     |
| build                      | (required) Builds an App, puts build in dist/app                       |

## Test commands

| npm run ...                | Description                                                            |
| ---------------------------| ---------------------------------------------------------------------- |
| test:e2e:browser           | Runs e2e tests in the browser via Cypress                              |
| test:e2e:ci                | The same as above, but browser is headless and records video           |
| cypress                    | Opens Cypress UI for e2e tests                                         |

