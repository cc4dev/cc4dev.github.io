
document.getElementById("page-footer-content-secret").style.cursor = "pointer";
document.getElementById("page-footer-content-ncs-youtube").style.cursor = "pointer";

document.getElementById("page-footer-content-secret").addEventListener("click", () => {
    window.open("/assets/secret.webp", '_blank').focus();
});

document.getElementById("page-footer-content-ncs-youtube").addEventListener("click", () => {
    window.open("https://www.youtube.com/playlist?list=PLRBp0Fe2Gpgn8Y9qI-p0aTxVtw8onBSFj", '_blank').focus();
});