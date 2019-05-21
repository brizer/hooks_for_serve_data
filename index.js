const shell = require("shelljs");
var http = require("http");
var createHandler = require("github-webhook-handler");
var handler = createHandler({ path: "/pushCode", secret: "study" }); // 根据git上webhook的配置填写
http
    .createServer(function (req, res) {
        handler(req, res, function (err) {
            res.statusCode = 404;
            res.end("no such location");
        });
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

    if (event.payload.ref == "refs/heads/deploy") {
        init();
    }
});

function init() {
    console.log("init deploy task");
    shell.cd('../nestDemo/serve-data')
    shell.exec('sh .shell/start.sh')
}

