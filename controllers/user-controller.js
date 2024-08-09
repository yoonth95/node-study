import connectDB from "../database/db.js";
import User from "../schemas/user-schema.js";

// body를 보내는 애들
// post, put, patch

// body 안 보내는 애들
// get, delete

// 개별 조회
export const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    await connectDB();
    const user = await User.findOne({ id: user_id });

    if (!user) {
      res.status(404).json({
        ok: false,
        message: "데이터베이스에 해당 이름을 가진 값이 없습니다.",
      });
    }

    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

// 사용자 추가
export const setUser = async (req, res) => {
  try {
    const { name, id, pw } = req.body;

    if (!id || !pw) {
      res.status(400).json({
        ok: false,
        message: "body에 id 또는 pw가 없습니다.",
      });
    }

    await connectDB();

    // name, id 등록
    const user = new User({
      name: name,
      id: id,
    });
    await user.setPassword(pw); // pw 해시 후 등록

    await user.save(); // 등록 된 값들 db에 저장

    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

// 유저 정보 수정
export const updateUser = async (req, res) => {
  try {
    const { id, pw } = req.body;

    await connectDB();

    // 먼저 사용자를 찾습니다.
    const user = await User.findOne({ id: id }).select("+password");
    if (!user) res.status(404).json({ ok: false, message: "존재하지 않는 유저입니다." });

    // 이름과 아이디 업데이트
    let updateData = { id: id };
    const isMatch = await user.comparePassword(pw);
    if (!isMatch) {
      const hashedPassword = await bcrypt.hash(pw, 10);
      updateData.password = hashedPassword;
    }

    // 이름, 아이디, 비밀번호 변경할 거임
    const updateUser = await User.findOneAndUpdate({ name: "홍길동2" }, { $set: updateData }, { new: true }); // new: true일 경우 업데이트 된 값을 가져옴

    res.status(200).json({ ok: true, data: updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

// 유저 삭제
export const deleteUser = async (req, res) => {
  const session = await mongoose.startSession(); // 세션 시작
  session.startTransaction(); // 트랜잭션 시작
  try {
    const { user_id } = req.params;

    // 데이터베이스 연결
    await connectDB();

    // 전체 유저 삭제
    // await User.deleteMany({ id: user_id })

    // 유저 삭제
    const deleteUserResult = await User.deleteOne({ id: user_id }).session(session); // 트랜잭션 세션 저장
    if (deleteUserResult.deletedCount === 0) {
      res.status(404).json({ ok: false, message: "삭제할 사용자가 없습니다." });
    }

    // 그 사람의 관심 주식 삭제
    // await Stock.deleteMany({ id: user_id }).session(session); // 트랜잭션 세션 저장

    await session.commitTransaction(); // 트랜잭션 커밋 (모든 작업이 성공적으로 완료된 경우)

    res.status(200).json({ ok: true, message: "삭제 성공" });
  } catch (err) {
    await session.abortTransaction(); // 만약 오류가 발생 시 전체 롤백
    console.error(err);
    res.status(500).json({ ok: false, message: err.message });
  } finally {
    // 세션 종료
    session.endSession();
  }
};
