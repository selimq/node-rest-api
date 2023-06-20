import en from "./en_US.js";
import tr from "./tr_TR.js";

export default (lang, key) => {
  if (lang == "tr") {
    return tr[key];
  } else {
    return en[key];
  }
};
