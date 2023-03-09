import testData from './Invoice.json';
import {SERIES_INFO} from '../src/ColsToSummaries';

const entireData = testData.map(jsonRawData => {
      return (
        jsonRawData
      )
    });

    // const entireData = testData.map(jsonRawData => {
    //     return (
    //       jsonRawData
    //     )
    //   });


const jsonData = function() {
    return entireData;
};

const getSummaryData = function(baseData,colsToSummaries, filters=0){
    // filters: [
    //     {name, operator, value}
    // ]

    const portfolioSummarieObj = {};
    if((typeof baseData !== 'undefined') && (Object.keys(baseData).length !== 0 )){
        colsToSummaries.forEach(key => {
            portfolioSummarieObj[key] = baseData.reduce((sum, records) => {
            const series = records[key] ?? [];
            return series.map((item, index) => {
                return item + (sum[index] ?? 0);
            })
            }, [])
        })
    }   

    return portfolioSummarieObj;
}

const getTableData = function(summariedData){
    // const formatted = [];
    if((typeof summariedData !== 'undefined') && (Object.keys(summariedData).length !== 0 )){
        const formatted = Object.keys(summariedData).map(aging => {
            const sumBuckets = {};
        
            summariedData[aging].forEach((sum, index) => {
                sumBuckets[`bucket${index + 1}`] = sum;
            })
           
          
            const lableName = SERIES_INFO[aging].label;
            return {
                
                "aging": lableName,
                ...sumBuckets
            };
            
        })
        return formatted;
    }else{
        return [];
    }
  }

  const getSummaryTableData = function(summariedData){
    if((typeof summariedData !== 'undefined') && (Object.keys(summariedData).length !== 0 )){
        const formatted = Object.keys(summariedData).map(aging => {
            const sumBuckets = {};
            let columnData =  0;
            summariedData[aging].forEach((sum, index) => {
                columnData = summariedData[aging][index] + columnData;
            })
            sumBuckets['balance'] = columnData;
            const lableName = SERIES_INFO[aging].label;
            return {                
                "aging": lableName,
                ...sumBuckets
            };            
        })
        return formatted;
    }else{
        return [];
    }
  }

const getSummaryData1 = function(baseData,colsToSummaries, filters=0){
    // filters: [
    //     {name, operator, value}
    var formatted =[];
    var indexOfKey= -1;
    var portfolioSummarieObj = {}
    for(let i = 0; i< baseData.length; i++){
        for(let j = 0; j< colsToSummaries.length; j++){
            if (baseData[i].hasOwnProperty(colsToSummaries[j])){
                    //json element has the entry seeded in the ColsList to summaries
                indexOfKey = Object.keys(baseData[i]).indexOf(colsToSummaries[j])
                
                // we assume the key of json is same summariesCol
                var cols = colsToSummaries
                if (formatted.length === 0 || formatted.length === j){
                    portfolioSummarieObj[cols[j]] = Object.values(baseData[i])[indexOfKey];
                    
                    //formatted.push(portfolioSummarieObj)
                }else{
                    for (const [key, value] of Object.entries(formatted[j])) {
                        for(let k=0; k<formatted[j][`${key}`].length ; k++){
                        formatted[j][`${key}`][k] = formatted[j][`${key}`][k] + baseData[i][`${key}`][k]
                        }
                    }
                }
            }
        }
    }
    return formatted;
}

export { getSummaryData, getTableData, getSummaryTableData };