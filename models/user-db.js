import util from "util";
import db from "../database/db2.js";

const query = util.promisify(db.query).bind(db);
const beginTransaction = util.promisify(db.beginTransaction).bind(db); // 트랜잭션 시작
const commit = util.promisify(db.commit).bind(db); // 트랜잭션 커밋
const rollback = util.promisify(db.rollback).bind(db); // 트랜잭션 롤백 (시작 지점으로)

// 전체 유저 조회
export const getAllMember = async (user_id) => {
  try {
    await beginTransaction(); // 트랜잭션 시작

    const result = await query(`SELECT idx, name, id FROM user WHERE id = ?`, [user_id]);
    await commit(); // 트랜잭션 커밋

    return result;
  } catch (err) {
    await rollback(); // 트랜잭션 롤백
    throw err;
  }
};
