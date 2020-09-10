# hello-world

This project generates a google page that has a simple text diff tool.
It will visually highlight differences between two strings and then
also show a table of the unicode code points for each different character.

It's not useful for very long texts with many differences.

This first calculates the minimal edit distance and uses the associated mapping
for all the rendering logic.

To deploy run `./deploy.sh`

It fails the last step for me, so after running it,
```
cd dist
git push -f git@github.com:timmahrt/live-diff-text-util.git master:gh-pages
```
works for me.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
