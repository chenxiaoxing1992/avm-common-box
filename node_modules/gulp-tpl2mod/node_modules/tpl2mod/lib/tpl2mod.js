module.exports = function(file_content, options){
    var lines = file_content.split("\n");
    var lines_count = lines.length;

    file_content = options.prefix + "'" + lines.map(function(line,index){
      return ( options.trimline ? line.trim() : line ) .replace(/'/g,"\\'");
    }).join( options.remainbreak ? "\\n" : "" )  + "'" + options.suffix;
    return file_content;
}