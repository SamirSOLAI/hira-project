import express from "express";

//init the app
const app = express();
app.use(express.json());

// routers
const router = express.Router();
app.use(router);
router.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    message:
      "hello how u doing! yes the front end and the back just communicated!",
  });
  console.log("hello bitches");
});
//lisening
app.listen(3001, () => {
  console.log("hello from the server yes");
});
