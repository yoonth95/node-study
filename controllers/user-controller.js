export const getUser = async (req, res) => {
  try {
    const stocks = [];

    res.status(200).json({ ok: true, data: stocks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: error.message });
  }
};
