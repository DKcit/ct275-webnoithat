var toggler = document.querySelector("button.navbar-toggler");
toggler.onclick = function () {
    var header_links = document.querySelector(".header__navbar-toggler .header__links-wrapper");
    header_links.classList.toggle("header__links--hidden");
}