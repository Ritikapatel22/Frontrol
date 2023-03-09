const populateProjWeekHierarchy = function (projData) {
    let hierarchy_data = [];
    let resourceExist = false;
    for (let i = 0; i < projData.length; i++){ 
        if (projData[i].wbs_level == 0){
            projData[i]['hierarchy']= [];
            projData[i]['hierarchy'].push("Project Level");
            hierarchy_data.push("Project Level");
        } else if(projData[i].row_type == 'T'){
            projData[i]['hierarchy']= [];
            if(resourceExist){
                resourceExist = false;
                hierarchy_data.pop(hierarchy_data.length - projData[i].wbs_level)
            }
            for (let j=0 ; j <hierarchy_data.length ; j++){
                projData[i]['hierarchy'].push(hierarchy_data[j]);
            }
            projData[i]['hierarchy'].push(projData[i].task_number + ' (' + projData[i].task_name + ')');
            hierarchy_data.push(projData[i].task_number + ' (' + projData[i].task_name + ')');
            
        } else if(projData[i].row_type == 'R'){
            projData[i]['hierarchy']= [];
            for (let j=0 ; j <hierarchy_data.length ; j++){
                projData[i]['hierarchy'].push(hierarchy_data[j]);
            }
            resourceExist = true;
            projData[i]['hierarchy'].push(projData[i].resource );
        }
    }
    return projData;
}

const populateHierarchyCall = function (projData) {
    let proj_id = 0;
    let project_numName = '';
    for (let i = 0; i < projData.length; i++){ 
        if (projData[i].row_type == 'P'){
            projData[i]['hierarchy'] =  [projData[i].project_number + ' (' + projData[i].project_name + ')'];
            proj_id = projData[i].project_id; 
            project_numName = projData[i].project_number + ' (' + projData[i].project_name + ')';
        } else if(projData[i].row_type == 'R' && projData[i].project_id == proj_id ){
            projData[i]['hierarchy']= [];
            projData[i]['hierarchy'].push(project_numName);
            // if(projData[i].person_name !== null && typeof(projData[i].person_name) !== 'undefined'){
                projData[i]['hierarchy'].push(projData[i].resource_name);
            // }
            // else{
                // projData[i]['hierarchy'].push(projData[i].supplier_name);
            // }            
        }
    }
    return projData;
}

export {

    populateHierarchyCall,
    populateProjWeekHierarchy
};