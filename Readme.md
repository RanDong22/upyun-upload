### upyun-upload

* command line tool to upload files to upyun

### Usage

```
 Usage: upyun-upload [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --config [config]  config file
    -v, --verbose          verbose
```

touch a `config.js`

```js

module.exports = {
  operator: 'your operator',
  password: 'your password',
  tasks: [{
    prefix: 'static/', // upload path prefix
    endpoint: '',
    bucket: 'your bucket',
    directory: 'your directory',
    rename: (origin) => {
      // optional
    }
  }]
}

```

run with `upyun-upload -c config.js`

### License
MIT
