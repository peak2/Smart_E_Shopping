const express = require("express");
const path = require("path");

const errorController = require("./controllers/error");
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user')


const app = express();

app.set("view engine", "ejs");
app.set("views", "views"); //the first views is the name of the folder you store ur html files into, the second views is default, which must not b changed
//suppose u use anoda name like template, u will use it like dz: app.set('template', 'views')

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(express.static(path.join(__dirname, "/public")));


app.use((req, res, next) => {
    User.findById('64a9f94fa7c82fbd77b4ca7c')
    .then((user) => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch((err) => console.log(err));
});


app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3905, () => {
      console.log("App Running on 3905");
    });
})
