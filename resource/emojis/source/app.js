var fs = require('fs');


var paths = fs.readdirSync('./');

paths.map((value, index, array) => {
	var folder = './' + value + '/';
    var files=fs.readdirSync(folder);
    for(var file of files){
        fs.copyFileSync(folder+file,'./'+value+'_'+file);
    }
})

