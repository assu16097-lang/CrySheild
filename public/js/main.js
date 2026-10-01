// ==========================================
// CyberShield Main JavaScript
// ==========================================

// Mobile navigation
const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle("show");

            if (mainNav.classList.contains("show")) {
                mobileMenuButton.textContent = "✕";
            } else {
                mobileMenuButton.textContent = "☰";
            }

        }
    );

}