var nodeCmd = require('node-cmd');
nodeCmd.get('ipconfig', {encoding: 'utf8' },
    function (err, stdout, stderr) {
        if (err) {
            console.log("\n" + stderr);
            console.log("出错");
        } else {
            console.log(stdout);
            console.log("成功");
        }
    }
)
