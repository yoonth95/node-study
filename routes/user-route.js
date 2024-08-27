import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.get("/user/getUser/:user_id", userController.getUser); // 유저 개별 정보 조회
router.post("/user/setUser", userController.setUser); // 유저 추가
router.put("/user/updateUser", userController.updateUser); // 유저 해당 전체 수정
router.patch("/user/updateUser", userController.updateUser); // 유저 해당 정보 일부 수정
router.delete("/user/deleteUser/:user_id", userController.deleteUser); // 유저 개별 삭제

router.post("/user/fileUpload", userController.fileUpload); // 파일 업로드
router.post("/user/fileUploadMany", userController.fileUploadMany); // 여러 파일 업로드

export default router;
