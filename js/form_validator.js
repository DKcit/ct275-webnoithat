function Validator(options) {
    selectorRules = {};

    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector);

        var rules = selectorRules[rule.selector];
        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage)
                break;
        }

        if(errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.closest(options.formGroupSelector).classList.add("invalid");
        } else {
            errorElement.innerHTML = '';
            inputElement.closest(options.formGroupSelector).classList.remove("invalid");
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if(formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid  = true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid) {
                    isFormValid = false;
                }
            });

            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not(#password_confirm)');
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                clearAllDataForm("form-1", ".form-message");

            }
        }

        options.rules.forEach(function(rule){
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            inputElement.onblur = function () {
                validate(inputElement, rule);
            }
            inputElement.oninput = function () {
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerHTML = '';
                inputElement.closest(options.formGroupSelector).classList.remove("invalid");
            }
        });
    }
}

function clearAllDataForm(id_form, error_selector) {
    var formElement = document.getElementById(id_form);
    var inputs = Array.from(formElement.querySelectorAll('[name]'));
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        var form_group_Element = inputs[i].closest(".form-group");
        form_group_Element.classList.remove("invalid");
        var errorMessage = form_group_Element.querySelector(error_selector);
        errorMessage.innerHTML = "";
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            if(value.trim())
                return undefined;
            if(message)
                return message;
            return 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if( !value.trim() || regex.test(value))
                return undefined;
            if(message)
                return message;
            return 'Trường này phải là email';
        }
    }
}

Validator.isNumberPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if(regex.test(value))
                return undefined;
            if(message)
                return message;
            return 'Trường này phải là số điện thoại';
        }
    }
}

Validator.isUserName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Za-z][a-zA-Z0-9]+$/;
            if(regex.test(value))
                return undefined;
            if(message)
                return message;
            return 'Trường này phải là tên đăng nhập';
        }
    }
}

Validator.isExistUserName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            if(!isExistUser(value))
                return undefined;
            if(message)
                return message;
            return 'Trường này phải là tên đăng nhập';
        }
    }
}

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
            if(regex.test(value))
                return undefined;
            if(message)
                return message;
            return 'Trường này phải là mật khẩu';
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            if(value.length >= min)
                return undefined;
            if(message)
                return message;
            return `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}

Validator.maxLength = function (selector, max, message) {
    return {
        selector: selector,
        test: function (value) {
            if(value.length <= max)
                return undefined;
            if(message)
                return message;
            return `Trường này chỉ được nhập tối đa ${max} kí tự`;
        }
    }
}

Validator.isConfirmed = function (id_form, selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var getConfirmValue = document.querySelector(`${id_form} #password`).value;
            if(value.localeCompare(getConfirmValue) === 0 ) {
                return undefined;
            } 
            if(message)
                return message;
            return 'Giá trị nhập vào không chính xác';
        }
    }
}
