function validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\b)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.userName === ""){
        error.userName = "Username should not be empty"
    }else{
        error.userName = ""
    }

    if(values.email === ""){
        error.email = "Name should not be empty"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password that contains 8 numbers or letters must be started with uppercase letter"
    }else{
        error.password = ""
    }
    return error;
}

export default validation;