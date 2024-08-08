import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.get("/user/getUser", userController.getUser); // 유저 정보 조회

// router.post("/user/postUser", userController.postUser); // 유저 정보 추가
// router.put("/user/putUser", userController.putUser); // 유저 정보 전체 수정
// router.patch("/user/patchUser", userController.patchUser); // 유저 정보 부분 수정
// router.delete("/user/deleteUser", userController.deleteUser); // 유저 정보 삭제
