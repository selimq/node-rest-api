import { errorHelper } from "../../utils";

class UserService {
  async create() {
    try {
    } catch (err) {}
  }

  async isExist(email) {
    const exist = await User.exists({ email: email }).catch((err) => {
      return res.status(500).json(errorHelper("00031", req, err.message));
    });
    return exist;
  }
}
