import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
 
server.use(middlewares);
server.use(router);
server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
server.options("*", cors());
server.listen(3001, () => {
    console.log("JSON Server is running");
});

export default jsonServer;
