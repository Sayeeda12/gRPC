const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bindAsync("localhost:4000", grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://localhost:4000");
        server.start();
    }
);
server.addService(todoPackage.Todo.service, 
    {
        "createTodo" : createTodo,
        "readTodos" : readTodos,
        "readTodoStream": readTodoStream
    }
);

const todoList = [];

//Depicts unary API call
function createTodo(call, callback) {
    const todoItem = {
        "id": todoList.length + 1,
        "text" : call.request.text
    }
    todoList.push(todoItem);
    callback(null, todoItem);
}

//Depicts unary API call
function readTodos(call, callback) {
    callback(null, {"items": todoList});
}

//Depicts client to server streaming API call
function readTodoStream(call, callback){
    todoList.forEach(item => call.write(item));
    call.end();
}
