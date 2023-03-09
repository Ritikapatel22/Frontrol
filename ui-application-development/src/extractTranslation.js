import Axios from "axios";

  const langMapping = {
    'en' : 'english',
    'fn': 'french',
    'zh': 'chinese'
  }

const extractTranslation = (folderName, langName) => {
 fetch(`http://localhost:3000/assests/translations/${folderName}.csv`,{
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        }).then((res) => res.text()).then((csv) => {
        	const data = csvJSON(csv, langName);
        	fetch(`http://localhost:3000/assests/i18n/${folderName}/${langName}.json`).then((res) => res.json()).then((savedJson) => {
        		for(let key in savedJson) {
              for(let dataKey in data) {
                if (dataKey.toLowerCase() === key.toLowerCase()) {
                  savedJson[key] = data[dataKey];
                }
              }
        		}
        		console.log(`translated ${langName} ${folderName}`, JSON.stringify(savedJson))
        	})
        })
}


const csvJSON = (csv, langName) =>{

  const lines=csv.split("\n");

  const result = {};
  const headers=lines[0].split(",");
  const keyIndex = headers.findIndex((name) => name.toLowerCase().trim() === 'key');
  const langIndex = headers.findIndex((name) => name.toLowerCase().trim() === langMapping[langName]);
  if (keyIndex < 0 || langIndex < 0) {
  	console.error("wrong csv file added");
  	return;
  }
  for(var i=1;i<lines.length;i++){

      const currentline=lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g);
      if (currentline[langIndex]){
      result[currentline[keyIndex]] = currentline[langIndex].replace(/^"(.*)"$/g, "$1");
    }

  }
  return JSON.parse(JSON.stringify(result)); //JSON
}

const extractDeltaLang = (folderName) => {
 fetch(`http://localhost:3000/assests/translations/${folderName}.csv`,{
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        }).then((res) => res.text()).then((csv) => {
          const data = csvJSON(csv, 'en');
          const results = [];
          const langKeys = Object.keys(langMapping);
          const promises = [];
          langKeys.forEach((key)=> {
            promises.push(fetch(`http://localhost:3000/assests/i18n/${folderName}/${key}.json`).then((res) => res.json()))
          })
          Promise.all(promises).then((items)=> {
                for(let key in items[0]) {
                  let flag = false;
                  for (let dataKey in data) {
                    if (dataKey.toLowerCase() === key.toLowerCase()) {
                      flag= true;
                    }
                  }
                  if (!flag) {
                    const obj = {
                      'KEY': key
                    }
                    langKeys.forEach((langKey, index)=> {
                      obj[langMapping[langKey].toUpperCase()] = items[index][key]
                    })
                    results.push(obj)
                  }
                }
           // console.log(`delta ${folderName}`, JSON.stringify(results))

            const fields = Object.keys(results[0])
            const replacer = function (key, value) {
              return value === null? '' : value
            }
            let csv = results.map(function (row) {
              // console.log("row",row);
              return fields.map(function (fieldName) {
                // console.log("fieldName",fieldName);
                return JSON.stringify(row[fieldName], replacer)
              }).join(',')
            })
            csv.unshift(fields.join(','))
            csv = csv.join('\n')
            let exportedFileName = folderName
            let blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
            const element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = `${exportedFileName}.csv`;
            document.body.appendChild(element);
            element.click();
          })
        })
}

  export { extractTranslation, extractDeltaLang }