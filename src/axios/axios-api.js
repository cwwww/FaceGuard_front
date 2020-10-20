import axiosService from "./axios-request";
const BASE = 'http://127.0.0.1:8000'
// 下面是POST形式

export const saveUserInfo = data => {
  return axiosService({
    url: BASE + `/saveUserInfo/`, // pass all data the user typed to back end
    method: "post",
    data
  });
};
export const registerCheck = data => {
  return axiosService({
    url: BASE + `/registerCheck/`, // check if the name has been used in our database
    method: "post",
    data
  });
};



