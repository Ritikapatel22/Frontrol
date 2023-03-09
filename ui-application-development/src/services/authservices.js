import http from "../http-common/http-common";

const create = (data) => {
  return http.post("/login", data);
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("timestamp");
};

// const storage = ()=>{
//   localStorage.getItem("portfolio");
//   // localStorage.getItem("")
// }

// const localStorage = ()=>{
//   const storage =localStorage.getItem("portfolio");
//   const addItem = deleteItem().getItem();
//   if(!addItem > deleteItem){
//     datastore();
//     return false;
//   }
//   return true
// }


const authCheck = () => {
  const logTime = localStorage.getItem("timestamp");
  const now = new Date().getTime();
  if (now > logTime) {
    logout();
    return true;
  }
  return false;
};

const LoginService = {
  create,
  logout,
  authCheck,

};

export default LoginService;
