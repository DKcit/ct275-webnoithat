function showInfoLogin() {
    var nav_link_login = document.querySelector(".nav-link-login");
    var nav_link_username = document.querySelector(".nav-link-login-username");
    var list_info_login = document.querySelector(".list-info-login");
    if(session.id_user) {
        list_info_login.classList.add("list-info-login--appear");
        nav_link_login.onclick = function() {
        }
        nav_link_username.innerHTML = user[session.id_user].username;
        var logout = document.querySelector(".logout");
        logout.onclick = function(e) {
            e.stopPropagation();
            session.id_user = null;
            session.apply_promo_code = false;
            localStorage.setItem("session", JSON.stringify(session));
            showInfoLogin();
        }
    } else {
        list_info_login.classList.remove("list-info-login--appear");
        nav_link_username.innerHTML = "Login";
        openAndCloseLogin();
    }
}

function handle_login(user) {
    var form_group_Element;
    var form_message_Element;
    var password_Element = document.getElementById('password-login');
    if(isExistUser(user.username)){
        if(isMatchPassword(user.username, user.password)){
            var modal = password_Element.closest(".modal");
            var login = modal.querySelector(".login");
            
            clearAllDataForm("form-2", ".form-message-login");
            login.classList.add("login--disappear");
            setTimeout( function(){
                modal.classList.toggle("modal-login--hidden");
                login.classList.remove("login--disappear");
            }, 500);
            session.id_user = id_of_user_name(user.username);
            localStorage.setItem("session", JSON.stringify(session));
            showInfoLogin();
            
        }
        else {
            form_group_Element = password_Element.closest(".form-group");
            form_group_Element.classList.add("invalid");
            form_message_Element = form_group_Element.querySelector(".form-message-login");
            form_message_Element.innerHTML = "Mật khẩu không đúng";
            password_Element.value = "";
        }
    }
    else {
        var username_Element = document.getElementById('username-login');
        form_group_Element = username_Element.closest('.form-group');
        form_group_Element.classList.add("invalid");
        form_message_Element = form_group_Element.querySelector(".form-message-login");
        form_message_Element.innerHTML = "Tên đăng nhập không đúng";
        password_Element.value = "";
    }
}

function openAndCloseLogin() {
    var nav_link_login = document.querySelector('.nav-link-login');
    var modal = document.querySelector(".modal-login--hidden");
    var login = document.querySelector(".login");
    var icon_close_login = document.querySelector(".exit-login-icon");

    var link_sign_up = document.querySelector(".link-singup");

    nav_link_login.onclick = function () {
        clearAllDataForm("form-2", ".form-message-login");
        modal.classList.toggle("modal-login--hidden");
        login.classList.add("login--appear");
        setTimeout( function(){
            login.classList.remove("login--appear");
        }, 500);
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
    }

    modal.onclick = function() {
        login.classList.remove("login--appear");
        login.classList.add("login--disappear");
        setTimeout( function(){
            modal.classList.toggle("modal-login--hidden");
            login.classList.remove("login--disappear");
        }, 500);
    }

    login.onclick = function(e) {
        login.classList.remove("cart--appear");
        e.stopPropagation();
    }

    icon_close_login.onclick = function(){
        login.classList.add("login--disappear");
        setTimeout( function(){
            modal.classList.toggle("modal-login--hidden");
            login.classList.remove("login--disappear");
        }, 500);
    }

    link_sign_up.onclick = function () {
        var modal_sign_up = document.querySelector(".modal-sign-up--hidden");
        modal.classList.toggle("modal-login--hidden");
        modal_sign_up.classList.toggle("modal-sign-up--hidden");
        Validator({
            form: "#form-1",
            errorSelector: '.form-message',
            formGroupSelector: '.form-group',
            rules: [
                Validator.isRequired('#username', '*Vui lòng nhập tên đăng nhập'),
                Validator.isRequired('#password', '*Vui lòng nhập mật khẩu'),
                Validator.isRequired('#password_confirm', '*Vui lòng nhập lại mật khẩu'),
                Validator.isRequired('#number_phone', '*Vui lòng nhập số điện thoại'), 
                Validator.isRequired('#city', '*Vui lòng chọn Tỉnh/Thành Phố'),
                Validator.maxLength('#username', 30, '*Tên đăng nhập không vượt quá 30 kí tự'),
                Validator.isUserName('#username', '*Tên đăng nhập không nhận kí tự số ở đầu (1,2,3,..) và kí tự đặc biệt (#,@,!,..)'),
                Validator.isExistUserName('#username', '*Tên đăng nhập đã tồn tại'),
                Validator.maxLength('#email', 50, '*Email không vượt quá 50 kí tự'),
                Validator.isEmail('#email', '*Email không đúng định dạng'),
                Validator.minLength('#password', 8, '*Mật khẩu phải ít nhất 8 kí tự'),
                Validator.maxLength('#password', 32, '*Mật khẩu tối đa là 32 kí tự'),
                Validator.isPassword('#password', '*Mật khẩu phải ít nhất 1 kí tự số, 1 kí tự thường, 1 kí tự hoa, 1 kí tự đặc biệt'),
                Validator.isConfirmed('#form-1', '#password_confirm', '*Mật khẩu nhập lại không trùng khớp'),
                Validator.maxLength('#number_phone', 13, '*Số điện thoại không vượt quá 13 kí tự'),
                Validator.isNumberPhone('#number_phone', '*Số điện thoại không hợp lệ')
            ],
            onSubmit: function(data) {
                create_user(data);
                var sign_up = document.querySelector(".wrapper-signup .form-container");
                var form_sign_up = document.getElementById("form-1");
                var modal_sign_up = form_sign_up.closest(".modal");
                sign_up.classList.add("sign-up--disappear");
                setTimeout( function(){
                    modal_sign_up.classList.toggle("modal-sign-up--hidden");
                    sign_up.classList.remove("sign-up--disappear");
                    
                    var modal_login = document.querySelector(".modal-login--hidden");
                    var login = document.querySelector(".login");
                    modal_login.classList.toggle("modal-login--hidden");
                    login.classList.add("login--appear");
                    setTimeout( function(){
                        login.classList.remove("login--appear");
                    }, 500);
                }, 500);
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
            }
        });
        clearAllDataForm("form-2", ".form-message-login");
    }
}

openAndCloseLogin();
showInfoLogin();