document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = this.getAttribute("href");
        });
    });
});
