const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));

app.post("/login", LoginController.post);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));