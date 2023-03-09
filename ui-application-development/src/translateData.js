import Axios from "axios";


export const TextFile = (param, fileName) => {
  const element = document.createElement("a");
  const textFile = new Blob([JSON.stringify(param,null, 3)], {type: 'application/json'}); //pass data from localStorage API to blob
  element.href = URL.createObjectURL(textFile);
  element.download = `${fileName}.json`;
  document.body.appendChild(element); 
  element.click();
}

let obj = {}
let count = 0
const translateJsonData = (folderName, changeLangTo) => {
 fetch(`http://localhost:3000/assests/i18n/${folderName}/en.json`).then((res) => res.json()).then((json) => {
  const keyLength = Object.keys(json).length 
  Object.keys(json).map(async (e) => { 
    count++
      translate(json[e], e, changeLangTo, keyLength === count)
  })
  })
}


  const translate = async (data, e, changeLangTo, shouldDownloadFile) => {
    // `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from_lang}&tl=${to_lang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURIComponent(sentences)}`
    Axios({
      url: "https://translate.googleapis.com/translate_a/single?client=gtx",
      method: "GET",
      params: {
        sl: "en",
        tl: changeLangTo,
        dt: "t",
        q: data
      }
    })
      .then((res) => {
        obj = {...obj, [e] : res.data[0][0][0]}
       
        if(shouldDownloadFile) {
          setTimeout(() => {
           // console.log("change", changeLangTo, obj)
           //TextFile(obj,changeLangTo)
          }, 1000)
        }
      })
      .catch((e) => {
        console.log("error",e);
      });
  };



  export { translateJsonData }
