// ==========================================
// CyberShield URL Scanner
// ==========================================

const scannerForm =
    document.getElementById("scannerForm");

const urlInput =
    document.getElementById("urlInput");

const scannerLoading =
    document.getElementById("scannerLoading");

const scannerError =
    document.getElementById("scannerError");

const scanResult =
    document.getElementById("scanResult");

const resultTitle =
    document.getElementById("resultTitle");

const resultBadge =
    document.getElementById("resultBadge");

const riskScore =
    document.getElementById("riskScore");

const resultURL =
    document.getElementById("resultURL");

const resultDomain =
    document.getElementById("resultDomain");

const resultHTTPS =
    document.getElementById("resultHTTPS");

const warningList =
    document.getElementById("warningList");


// ==========================================
// Form submit
// ==========================================

if (scannerForm) {

    scannerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const url =
                urlInput.value.trim();

            hideError();

            scanResult.classList.add(
                "hidden"
            );

            scannerLoading.classList.remove(
                "hidden"
            );


            try {

                const response =
                    await fetch(
                        "/api/scan-url",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                url: url
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                        "Scanner request failed."
                    );
                }


                displayResult(data);

            } catch (error) {

                console.error(error);

                showError(
                    error.message ||
                    "Unable to scan URL."
                );

            } finally {

                scannerLoading.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ==========================================
// Display result
// ==========================================

function displayResult(data) {

    scanResult.classList.remove(
        "hidden"
    );

    resultTitle.textContent =
        data.result;

    riskScore.textContent =
        data.riskScore;

    resultURL.textContent =
        data.url;

    resultDomain.textContent =
        data.domain;

    resultHTTPS.textContent =
        data.https
            ? "Enabled"
            : "Not enabled";


    // Badge
    resultBadge.textContent =
        data.result.toUpperCase();

    resultBadge.className =
        "risk-badge";


    if (data.result === "Safe") {

        resultBadge.classList.add(
            "safe"
        );

    } else if (
        data.result === "Suspicious"
    ) {

        resultBadge.classList.add(
            "suspicious"
        );

    } else {

        resultBadge.classList.add(
            "high-risk"
        );

    }


    // Warnings
    warningList.innerHTML = "";


    if (
        !data.warnings ||
        data.warnings.length === 0
    ) {

        const item =
            document.createElement("li");

        item.textContent =
            "No suspicious patterns were detected by these basic checks.";

        warningList.appendChild(item);

    } else {

        data.warnings.forEach(
            (warning) => {

                const item =
                    document.createElement("li");

                item.textContent =
                    warning;

                warningList.appendChild(
                    item
                );

            }
        );

    }

}


// ==========================================
// Error handling
// ==========================================

function showError(message) {

    scannerError.textContent =
        message;

    scannerError.classList.remove(
        "hidden"
    );
}


function hideError() {

    scannerError.textContent = "";

    scannerError.classList.add(
        "hidden"
    );
}