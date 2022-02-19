const express = require("express");
const { spawn } = require("child_process");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("i am backend");
});
app.post("/fixgrammer", (req, res) => {
  const data = req.body.text;
  console.log(data);
  var dataToSend;

  const python = spawn("python", ["script1.py", `${data}`]);
  python.stdout.on("data", (data) => {
    dataToSend = data.toString();
  });

  python.on("close", (code) => {
    console.log(`child process close ${code}`);
    // send data to browser
    console.log(dataToSend);
    res.send({ fixed: dataToSend });
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
