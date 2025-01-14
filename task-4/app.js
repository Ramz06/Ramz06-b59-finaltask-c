const express = require("express");
const app = express();
const port = 3000
const hbs = require("hbs")
const path = require("path")
const sessionMiddleware = require("./src/middlewares/session-middleware")
const pageController = require("./src/controllers/page-controller");
const userController = require("./src/controllers/user-controller");
const collectionController = require("./src/controllers/collection-controller")
const taskController = require("./src/controllers/task-controller")
const {registerUserValidation, loginUserValidation} = require("./src/validation/user-validation")


app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.registerHelper('eq', (a, b) => a === b);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(sessionMiddleware);

app.get("/", pageController.index)

app.get("/api/users", userController.getUser)
app.get("/users/register", userController.renderRegister)
app.get("/users/login",  userController.renderLogin)
app.post("/users/register", registerUserValidation, userController.register)
app.post("/users/login", loginUserValidation, userController.login)
app.delete("/users/logout", userController.logout)

app.get("/collection", collectionController.renderCollection)
app.post("/collection", collectionController.addCollection)
app.delete("/collection/:id", collectionController.deleteCollection)

app.get("/collection/:id", taskController.renderTask)
app.get("/api/task", taskController.getTaskId)
app.post("/collection/task", taskController.addTask)
app.patch("/collection/task/:id", taskController.changeTaskStatus)

app.use("/", (req, res) => {
    res.send("404")
} )
app.listen(port, () => {
    console.log(`app listening in http://locahost:${port}`)
})
