require("dotenv").config();

const express = require("express");
const passport = require("passport");
const mainRoute = require("./routes/index");
const userRoute = require("./routes/user");
const GoogleRoute = require("./routes/google");
const TwitterRoute = require("./routes/twitterRoute");
const session = require("./config/session");
var cors = require("cors");
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./config/passport");
require("./config/Google");
require("./config/Twitter");

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRoute);
app.use("/u/", userRoute);
app.use("/auth/google", GoogleRoute);
app.use("/auth/twitter", TwitterRoute);

app.listen(process.env.PORT || 4000);
