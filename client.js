const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:4000", grpc.credentials.createInsecure());

client.createTodo({
    "id": -1,
    "text": "Complete gRPC Course"
}, (err, response) => {
    console.log("Todo created: " + JSON.stringify(response));
});

client.readTodos({}, (err, response) => {
    console.log("List of todos: " + JSON.stringify(response));
});