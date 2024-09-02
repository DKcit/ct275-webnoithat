var citis = document.getElementById("city");
var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
    method: "GET", 
    responseType: "json", 
};
var promise = axios(Parameter);
promise.then(function (result) {
    renderCity(result.data);
});
                                                
function renderCity(data) {
    for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }
}

function create_user(formValues) {
    formValues["role"] = "user";
    user = localStorage.getItem("user");
    if(user) {
        auto_id_user = JSON.parse(localStorage.getItem("auto_id_user"));
        auto_id_user++;
        localStorage.setItem("auto_id_user", JSON.stringify(auto_id_user));
        var id = auto_id_user.toString();
        user = JSON.parse(user);
        user[id] = formValues;
    } else {
        user = {
            "1": formValues
        }
    }
    
    
    localStorage.setItem("user", JSON.stringify(user));
}

function openAndCloseSignUp() {
    var sign_up = document.querySelector(".wrapper-signup .form-container");
    var modal = document.querySelector(".modal-sign-up--hidden");
    var sign_in_link = document.querySelector(".signin-link a");

    modal.onclick = function() {
        sign_up.classList.add("sign-up--disappear");
        setTimeout( function(){
            modal.classList.toggle("modal-sign-up--hidden");
            sign_up.classList.remove("sign-up--disappear");
        }, 500);
        clearAllDataForm("form-1", ".form-message");
    }

    sign_up.onclick = function(e) {
        e.stopPropagation();
    }

    sign_in_link.onclick = function () {
        var modal_login = document.querySelector(".modal-login--hidden");
        modal.classList.toggle("modal-sign-up--hidden");
        modal_login.classList.toggle("modal-login--hidden");
        Validator({
            form: "#form-2",
            errorSelector: '.form-message-login',
            formGroupSelector: '.form-group',
            rules: [
                Validator.isRequired('#username-login', '*Vui lòng nhập tên đăng nhập'),
                Validator.isRequired('#password-login', '*Vui lòng nhập mật khẩu')
            ],
            onSubmit: function(data) {
                handle_login(data);
            }
        });
        clearAllDataForm("form-1", ".form-message");
    }
}

openAndCloseSignUp();