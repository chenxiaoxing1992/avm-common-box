#!/usr/bin/env node
var tpl2mod = require("../lib/tpl2mod");
var program = require("commander");
var fs = require("fs");

function toString(val){
    return val ? ("" + val) : "";
}

program
  .version(require("../package.json").version)
  .usage('[options]')
  .option('-p, --prefix <prefix>', 'prefix before content')
  .option('-s, --suffix <suffix>', 'suffix after content')
  .option('-t, --trimline', 'whether to trim line')
  .option('-b, --remainbreak', 'whether to remain line break')
  .option('-f, --file <file>', 'file to transfer')
  .option('-o, --out <out>', 'file to write')
  .parse(process.argv);



if(!program.file){
    program.help();
    process.exit(0);
}


var file_content = fs.readFileSync(program.file,'utf-8');

file_content = tpl2mod(file_content,{
    trimline:program.trimline,
    remainbreak:program.remainbreak,
    prefix:toString(program.prefix),
    suffix:toString(program.suffix)
});

// Write the destination file.
if(program.out){
    fs.writeFileSync(program.out, file_content);
}else{
    console.log(file_content);
}

