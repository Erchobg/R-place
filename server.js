let canvas;
const canvas_size = 5;

// Create a two-dimensional array
function make_canvas(n) {
  canvas = [];
  for (let i = 0; i < n; i++) {
    canvas[i] = [];
    for (let j = 0; j < n; j++) {
      canvas[i][j] = {
        r: 255,
        g: 255,
        b: 255,
      };
    }
  }
}

// Update the canvas with a new color
function update_canvas(col, row, new_r, new_g, new_b) {
  console.log(col, row);
  canvas[col][row] = {
    r: new_r,
    g: new_g,
    b: new_b,
  };
}

make_canvas(canvas_size);

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files
app.use(express.static(path.join(__dirname, "public")));


// GET Request to localhost:3000/
app.get("/", function (req, res) {
  res.status(200).send("NQMA NISHTO TUKA");
});

// GET request to localhost:3000/map
app.get("/map", function (req, res) {
  res.status(200).json(canvas);
});

// PUT request to localhost:3000/risuvai?X=1&Y=2&R=200&G=100&B=50
app.put("/risuvai", function (req, res) {
  let X = parseInt(req.query.X),
    Y = parseInt(req.query.Y),
    R = parseInt(req.query.R),
    G = parseInt(req.query.G),
    B = parseInt(req.query.B);

  if (isNaN(X) || X < 0 || X >= canvas_size) {
    res.status(400).send("X should be a number between 0 and " + (canvas_size - 1));
    return;
  }

  if (isNaN(R) || R < 0 || R > 255) {
    res.status(400).send("R should be a number between 0 and 255");
    return;
  }

  update_canvas(X, Y, R, G, B);
  res.status(200).send("Successfully updated the canvas");
});

app.listen(port, function () {
  console.log("Server is listening on port:" + port);
});