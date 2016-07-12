#Tpl2mod (Template to Module)

translate template to javascript string


##Usage:

`npm install tpl2mod --save`

```
      Usage: tpl2mod [options]

      Options:

        -h, --help             output usage information
        -V, --version          output the version number
        -p, --prefix <prefix>  prefix before content
        -s, --suffix <suffix>  suffix after content
        -t, --trimline         whether to trim line
        -b, --remainbreak      whether to trim line
        -f, --file <file>      file to transfer
        -o, --out <out>        file to write
```

##Javascript API:

```javascript
    var tpl2mod = require("tpl2mod");
    file_content = tpl2mod(file_content,{
        trimline:true,
        remainbreak:false,
        prefix:"",
        suffix:""
    });
```