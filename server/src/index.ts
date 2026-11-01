import express from "express";

//init the app
const app = express();
app.use(express.json());

// routers
const router = express.Router();
app.use(router);
router.get("/api/v1/hello", (req, res) => {
  res.status(200).json({
    message: "hello how u doing!",
  });
});
//lisening
app.listen(3001, () => {
  console.log("hello from the server");
});
