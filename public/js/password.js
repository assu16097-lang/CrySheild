// ==========================================
// CyberShield Password Security
// ==========================================

const passwordInput =
    document.getElementById("passwordInput");

const togglePassword =
    document.getElementById("togglePassword");

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");

const passwordChecks =
    document.getElementById("passwordChecks");

const passwordSuggestions =
    document.getElementById(
        "passwordSuggestions"
    );

const lengthRange =
    document.getElementById("lengthRange");

const lengthValue =
    document.getElementById("lengthValue");

const generatedPassword =
    document.getElementById(
        "generatedPassword"
    );

const generatePasswordButton =
    document.getElementById(
        "generatePassword"
    );

const copyPasswordButton =
    document.getElementById(
        "copyPassword"
    );

const generatorStrength =
    document.getElementById(
        "generatorStrength"
    );


// ==========================================
// Password strength checker
// ==========================================

function checkPassword(password) {

    let score = 0;

    const checks = {
        length:
            password.length >= 12,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /[0-9]/.test(password),

        special:
            /[^A-Za-z0-9]/.test(password)
    };


    // Points
    if (password.length >= 8) {
        score += 1;
    }

    if (password.length >= 12) {
        score += 1;
    }

    if (password.length >= 16) {
        score += 1;
    }

    if (checks.uppercase) {
        score += 1;
    }

    if (checks.lowercase) {
        score += 1;
    }

    if (checks.number) {
        score += 1;
    }

    if (checks.special) {
        score += 1;
    }


    // Common password patterns
    const commonPatterns = [
        "password",
        "123456",
        "12345678",
        "qwerty",
        "admin",
        "letmein",
        "welcome",
        "abc123"
    ];

    const lower =
        password.toLowerCase();

    const isCommon =
        commonPatterns.some(
            pattern =>
                lower.includes(pattern)
        );


    if (isCommon) {
        score = Math.max(
            0,
            score - 3
        );
    }


    // Strength
    let strength =
        "Weak";

    let percentage = 20;


    if (password.length === 0) {

        strength =
            "Not checked";

        percentage = 0;

    } else if (score <= 2) {

        strength =
            "Weak";

        percentage = 25;

    } else if (score <= 4) {

        strength =
            "Medium";

        percentage = 50;

    } else if (score <= 6) {

        strength =
            "Strong";

        percentage = 75;

    } else {

        strength =
            "Very Strong";

        percentage = 100;

    }


    // Update UI
    strengthBar.style.width =
        `${percentage}%`;

    strengthText.textContent =
        strength;


    // Update checklist
    const checkItems =
        passwordChecks.querySelectorAll(
            "div"
        );


    const values = [
        checks.length,
        checks.uppercase,
        checks.lowercase,
        checks.number,
        checks.special
    ];


    checkItems.forEach(
        (item, index) => {

            const icon =
                item.querySelector("span");

            if (values[index]) {

                item.classList.add(
                    "valid"
                );

                icon.textContent =
                    "✓";

            } else {

                item.classList.remove(
                    "valid"
                );

                icon.textContent =
                    "○";

            }

        }
    );


    // Suggestions
    passwordSuggestions.innerHTML =
        "";


    const suggestions = [];


    if (password.length < 12) {
        suggestions.push(
            "Use at least 12 characters."
        );
    }

    if (!checks.uppercase) {
        suggestions.push(
            "Add uppercase letters."
        );
    }

    if (!checks.lowercase) {
        suggestions.push(
            "Add lowercase letters."
        );
    }

    if (!checks.number) {
        suggestions.push(
            "Add numbers."
        );
    }

    if (!checks.special) {
        suggestions.push(
            "Add special characters."
        );
    }

    if (isCommon) {
        suggestions.push(
            "Avoid common password patterns."
        );
    }

    if (suggestions.length === 0) {
        suggestions.push(
            "This password meets the basic checks. Use a unique password for this account."
        );
    }


    suggestions.forEach(
        (suggestion) => {

            const li =
                document.createElement("li");

            li.textContent =
                suggestion;

            passwordSuggestions.appendChild(
                li
            );

        }
    );


    return {
        strength,
        score,
        checks
    };
}


// ==========================================
// Password input
// ==========================================

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        () => {

            checkPassword(
                passwordInput.value
            );

        }
    );

}


// ==========================================
// Show / hide password
// ==========================================

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                togglePassword.textContent =
                    "🙈";

            } else {

                passwordInput.type =
                    "password";

                togglePassword.textContent =
                    "👁️";

            }

        }
    );

}


// ==========================================
// Generator
// ==========================================

const uppercase =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercase =
    "abcdefghijklmnopqrstuvwxyz";

const numbers =
    "0123456789";

const symbols =
    "!@#$%^&*()_+-=[]{}|;:,.<>?";


function generateRandomPassword() {

    const length =
        Number(lengthRange.value);

    const useUppercase =
        document.getElementById(
            "includeUppercase"
        ).checked;

    const useLowercase =
        document.getElementById(
            "includeLowercase"
        ).checked;

    const useNumbers =
        document.getElementById(
            "includeNumbers"
        ).checked;

    const useSymbols =
        document.getElementById(
            "includeSymbols"
        ).checked;


    let characters = "";

    if (useUppercase) {
        characters += uppercase;
    }

    if (useLowercase) {
        characters += lowercase;
    }

    if (useNumbers) {
        characters += numbers;
    }

    if (useSymbols) {
        characters += symbols;
    }


    if (!characters) {

        alert(
            "Please select at least one character type."
        );

        return;

    }


    let password = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        password +=
            characters[randomIndex];

    }


    generatedPassword.value =
        password;


    const result =
        checkPassword(password);


    generatorStrength.textContent =
        `Generated password strength: ${result.strength}`;

}


// ==========================================
// Range
// ==========================================

if (lengthRange) {

    lengthRange.addEventListener(
        "input",
        () => {

            lengthValue.textContent =
                lengthRange.value;

        }
    );

}


// ==========================================
// Generate button
// ==========================================

if (generatePasswordButton) {

    generatePasswordButton.addEventListener(
        "click",
        generateRandomPassword
    );

}


// ==========================================
// Copy button
// ==========================================

if (copyPasswordButton) {

    copyPasswordButton.addEventListener(
        "click",
        async () => {

            const password =
                generatedPassword.value;

            if (!password) {
                return;
            }

            try {

                await navigator.clipboard.writeText(
                    password
                );

                copyPasswordButton.textContent =
                    "Copied!";

                setTimeout(
                    () => {

                        copyPasswordButton.textContent =
                            "Copy";

                    },
                    1500
                );

            } catch (error) {

                // Fallback for older browsers
                generatedPassword.select();

                document.execCommand(
                    "copy"
                );

                copyPasswordButton.textContent =
                    "Copied!";

                setTimeout(
                    () => {

                        copyPasswordButton.textContent =
                            "Copy";

                    },
                    1500
                );

            }

        }
    );

}