const shell = require("shelljs");
var http = require("http");
var createHandler = require("github-webhook-handler");
var handler = createHandler({ path: "/pushCode", secret: "study" }); // 根据git上webhook的配置填写
// var handlerInterview = createHandler({ path: "/pushCodeInterview", secret: "study" }); // 根据git上webhook的配置填写
http
    .createServer(function (req, res) {
        handler(req, res, function (err) {
            res.statusCode = 404;
            res.end("no such location");
        });
        // handlerInterview(req, res, function (err) {
        //     res.statusCode = 404;
        //     res.end("no such location");
        // });
    })
    .listen(7777);

handler.on("error", function (err) {
    console.error("Error:", err.message);
});

// listening push event
handler.on("push", function (event) {
    console.log(
        "Received a push event for %s to %s",
        event.payload.repository.name,
        event.payload.ref
    );

    if (event.payload.ref == "refs/heads/master") {
        init();
    }
});
// handlerInterview.on("push", function (event) {
//     console.log(
//         "Received a push event for %s to %s",
//         event.payload.repository.name,
//         event.payload.ref
//     );

//     if (event.payload.ref == "refs/heads/master") {
//         handlerInterview();
//     }
// });

function init() {
    console.log("init deploy task");
    shell.cd('../awesome-url')
    shell.exec('git pull')
    shell.exec('sh ./deploy.sh')
}
function handlerInterview() {
    console.log("init deploy task");
    shell.cd('../Interview')
    shell.exec('git pull')
    shell.exec('sh ./deploy.sh')
}

