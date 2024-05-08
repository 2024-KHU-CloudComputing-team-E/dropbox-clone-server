import express from "express";
import { exampleController } from "../controllers/exampleController";

const exampleRouter = express.Router();

exampleRouter.post("/api/example1", (req, res) => {
  res.send("이것은 예시 라우터입니다");
});

exampleRouter.post("/api/example2", exampleController);
/* 파일 분할을 위해 express Router를 사용하면 좋을것 같습니다. */
/* 가독성 및 코드 분할을 위해 컨트롤러를 작성해서 임포트 하는 식으로 하는게 좋을 것 같습니다. */

export default exampleRouter;
