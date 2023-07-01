function validation(values){
    let error = {}

    if(values.catID === ""){
        error.catID = "Cat ID should not be empty"
    }else{
        error.catID = ""
    }

    if(values.catType === ""){
        error.catType = "The type of cat should not be empty"
    }else{
        error.catType = ""
    }

    if(values.countryOfOrigin === ""){
        error.countryOfOrigin = "The country of origin of cat should not be empty"
    }else{
        error.countryOfOrigin = ""
    }

    if(values.hairType === ""){
        error.hairType = "The type of hair of cat should not be empty"
    }else{
        error.hairType = ""
    }

    if(values.shelter_center === ""){
        error.shelter_center = "The shelter center of cat should not be empty"
    }else{
        error.shelter_center = ""
    }

    if(values.address === ""){
        error.address = "The shelter center of cat should not be empty"
    }else{
        error.address = ""
    }

    if(values.businessHours === ""){
        error.businessHours = "The shelter center of cat should not be empty"
    }else{
        error.businessHours = ""
    }

    if(values.contactNum === ""){
        error.contactNum = "The shelter center of cat should not be empty"
    }else{
        error.contactNum = ""
    }
    return error;
}

export default validation;