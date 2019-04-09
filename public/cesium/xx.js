(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// var exec = require('child_process').exec;
// exec('cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf && dir &&node bin\\obj2gltf.js -i box.obj -o box.gltf',function (err,stdout,stderr) {
//     if (err) {
//         console.log("\n"+stderr);
//         console.log("出错");
//     } else {
//         console.log(stdout);
//         console.log("成功");
//     }
// });
var nodeCmd = require('node-cmd');


nodeCmd.get(
    'cd E:\\Desktop\\project\\cesiumJS\\node_modules\\obj2gltf && dir &&node bin\\obj2gltf.js -i box.obj -o box.gltf',
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

// nodeCmd.run('ipconfig');

},{"node-cmd":3}],3:[function(require,module,exports){
var exec = require('child_process').exec;

var commandline={
    get:getString,
    run:runCommand
};

function runCommand(command){
    //return refrence to the child process
    return exec(
        command
    );
}

function getString(command,callback){
    //return refrence to the child process
    return exec(
        command,
        (
            function(){
                return function(err,data,stderr){
                    if(!callback)
                        return;

                    callback(err, data, stderr);
                }
            }
        )(callback)
    );
}

module.exports=commandline;

},{"child_process":1}]},{},[2]);
