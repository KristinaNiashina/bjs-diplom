"use strict";

let userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    if(!response.success){
        throw new Error;
    }
    location.reload();
});

userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    if(!response.success){
        throw new Error;
    }
    location.reload();
});