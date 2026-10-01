const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// ==================================================
// HOME
// ==================================================

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==================================================
// AI CHATBOT
// ==================================================

app.post("/api/chat", async function (req, res) {

    try {

        const message = req.body.message;

        console.log("");
        console.log("================================");
        console.log("CHATBOT REQUEST");
        console.log("Message:", message);
        console.log("API KEY FOUND:", !!process.env.GEMINI_API_KEY);
        console.log("================================");

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                reply: "Please enter a question."
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                reply: "GEMINI_API_KEY is missing from .env"
            });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        // Try several current stable models.
        const models = [
            "gemini-3.5-flash-lite",
            "gemini-3.5-flash",
            "gemini-3.6-flash",
            "gemini-3.7-flash",
            "gemini-3.8-flash"
        ];

        let response = null;
        let lastError = null;

        for (const model of models) {

            try {

                console.log("Trying model:", model);

                response = await ai.models.generateContent({

                    model: model,

                    contents: message.trim(),

                    config: {
                        systemInstruction:
                            "You are CyberShield AI, a helpful cybersecurity education assistant. " +
                            "Give simple beginner-friendly cybersecurity advice. " +
                            "Help with phishing, passwords, Gmail security, malware, Wi-Fi security, " +
                            "privacy, safe browsing and cyber incident response. " +
                            "Do not provide instructions for unauthorized access, credential theft, " +
                            "malware creation, or attacking systems. " +
                            "Provide safe defensive alternatives instead.",

                        maxOutputTokens: 1000
                    }
                });

                console.log("SUCCESS:", model);

                break;

            } catch (error) {

                console.log("FAILED:", model);
                console.log("ERROR:", error.message);

                lastError = error;
            }
        }

        if (!response) {

            console.log("ALL GEMINI MODELS FAILED");

            return res.status(503).json({

                success: false,

                reply:
                    "Gemini is temporarily unavailable. " +
                    "Please wait a moment and try again."
            });
        }

        const answer = response.text;

        if (!answer) {

            return res.status(500).json({

                success: false,

                reply: "Gemini returned an empty response."
            });
        }

        console.log("Gemini answer received.");

        return res.json({

            success: true,

            reply: answer
        });

    } catch (error) {

        console.log("");
        console.log("================================");
        console.log("CHATBOT ERROR");
        console.log("================================");
        console.log(error.message);
        console.log("================================");

        return res.status(500).json({

            success: false,

            reply:
                "Chatbot error: " +
                error.message
        });
    }
});

// ==================================================
// URL THREAT SCANNER
// ==================================================

app.post("/api/scan-url", function (req, res) {

    try {

        const url = req.body.url;

        console.log("");
        console.log("================================");
        console.log("URL SCANNER");
        console.log("URL:", url);
        console.log("================================");

        if (!url || url.trim() === "") {

            return res.status(400).json({

                success: false,

                message: "Please enter a URL."
            });
        }

        let parsedURL;

        try {

            parsedURL = new URL(url);

        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid URL. Please enter a valid URL."
            });
        }

        let score = 0;

        const warnings = [];

        const checks = [];

        // HTTPS
        if (parsedURL.protocol === "https:") {

            checks.push({
                name: "HTTPS",
                status: "Safe",
                message: "Website uses HTTPS."
            });

        } else {

            score += 20;

            warnings.push(
                "Website does not use HTTPS."
            );

            checks.push({
                name: "HTTPS",
                status: "Warning",
                message: "Website does not use HTTPS."
            });
        }

        // IP address
        const hostname = parsedURL.hostname;

        const ipPattern =
            /^(?:\d{1,3}\.){3}\d{1,3}$/;

        if (ipPattern.test(hostname)) {

            score += 20;

            warnings.push(
                "URL uses an IP address instead of a domain name."
            );

            checks.push({
                name: "IP Address",
                status: "Warning",
                message: "URL uses an IP address."
            });

        } else {

            checks.push({
                name: "IP Address",
                status: "Safe",
                message: "URL uses a domain name."
            });
        }

        // Suspicious keywords
        const suspiciousWords = [
            "login",
            "verify",
            "verification",
            "account",
            "secure",
            "update",
            "password",
            "confirm",
            "bank",
            "free",
            "winner",
            "gift",
            "claim"
        ];

        const lowerURL = url.toLowerCase();

        const foundWords = [];

        suspiciousWords.forEach(function (word) {

            if (lowerURL.includes(word)) {

                foundWords.push(word);
            }
        });

        if (foundWords.length > 0) {

            score += Math.min(
                foundWords.length * 5,
                20
            );

            warnings.push(
                "Suspicious keywords found: " +
                foundWords.join(", ")
            );

            checks.push({
                name: "Suspicious Keywords",
                status: "Warning",
                message: foundWords.join(", ")
            });

        } else {

            checks.push({
                name: "Suspicious Keywords",
                status: "Safe",
                message:
                    "No common suspicious keywords found."
            });
        }

        // @ symbol
        if (url.includes("@")) {

            score += 20;

            warnings.push(
                "URL contains @ symbol."
            );

            checks.push({
                name: "@ Symbol",
                status: "Warning",
                message: "URL contains @ symbol."
            });

        } else {

            checks.push({
                name: "@ Symbol",
                status: "Safe",
                message: "No @ symbol found."
            });
        }

        // URL length
        if (url.length > 100) {

            score += 10;

            warnings.push(
                "URL is unusually long."
            );

            checks.push({
                name: "URL Length",
                status: "Warning",
                message: "URL is unusually long."
            });

        } else {

            checks.push({
                name: "URL Length",
                status: "Safe",
                message: "URL length looks normal."
            });
        }

        // Punycode
        if (hostname.includes("xn--")) {

            score += 15;

            warnings.push(
                "Punycode domain detected."
            );

            checks.push({
                name: "Punycode",
                status: "Warning",
                message: "Punycode domain detected."
            });

        } else {

            checks.push({
                name: "Punycode",
                status: "Safe",
                message: "No Punycode detected."
            });
        }

        // Subdomains
        const parts = hostname.split(".");

        if (parts.length > 4) {

            score += 10;

            warnings.push(
                "URL contains many subdomains."
            );

            checks.push({
                name: "Subdomains",
                status: "Warning",
                message: "Many subdomains detected."
            });

        } else {

            checks.push({
                name: "Subdomains",
                status: "Safe",
                message:
                    "Subdomain structure looks normal."
            });
        }

        // Double slash
        const afterProtocol =
            url.replace(/^https?:\/\//, "");

        if (afterProtocol.includes("//")) {

            score += 10;

            warnings.push(
                "URL contains an unusual double slash."
            );

            checks.push({
                name: "Double Slash",
                status: "Warning",
                message:
                    "Unusual double slash detected."
            });

        } else {

            checks.push({
                name: "Double Slash",
                status: "Safe",
                message:
                    "No unusual double slash detected."
            });
        }

        // Encoded characters
        if (/%[0-9A-Fa-f]{2}/.test(url)) {

            score += 5;

            warnings.push(
                "Encoded characters detected in URL."
            );

            checks.push({
                name: "Encoded Characters",
                status: "Warning",
                message:
                    "Encoded characters detected."
            });

        } else {

            checks.push({
                name: "Encoded Characters",
                status: "Safe",
                message:
                    "No unusual encoded characters found."
            });
        }

        if (score > 100) {
            score = 100;
        }

        let result;

        if (score >= 60) {

            result = "Dangerous";

        } else if (score >= 30) {

            result = "Suspicious";

        } else {

            result = "Likely Safe";
        }

        console.log("Score:", score);
        console.log("Result:", result);

        return res.json({

            success: true,

            url: url,

            score: score,

            result: result,

            warnings: warnings,

            checks: checks
        });

    } catch (error) {

        console.log(
            "URL SCANNER ERROR:",
            error.message
        );

        return res.status(500).json({

            success: false,

            message: "URL scanner error.",

            error: error.message
        });
    }
});

// ==================================================
// CYBERSECURITY NEWS
// ==================================================

app.get("/api/news", (req, res) => {

    const news = [

        {
            title: "New Phishing Campaign Targets Gmail Users",
            description:
                "Cybersecurity researchers have warned users about phishing emails designed to steal Gmail login credentials.",
            category: "Phishing",
            date: "30 September 2026",
            severity: "High"
        },

        {
            title: "Critical Security Vulnerability Discovered",
            description:
                "A critical software vulnerability could allow attackers to gain unauthorized access to affected systems.",
            category: "Vulnerability",
            date: "29 September 2026",
            severity: "Critical"
        },

        {
            title: "Ransomware Attacks Continue to Target Businesses",
            description:
                "Organizations are advised to maintain secure backups and keep operating systems and applications updated.",
            category: "Ransomware",
            date: "28 September 2026",
            severity: "High"
        },

        {
            title: "Cybersecurity Experts Warn About Fake Websites",
            description:
                "Users should carefully check website addresses before entering passwords, payment information or personal data.",
            category: "Phishing",
            date: "27 September 2026",
            severity: "Medium"
        },

        {
            title: "Multi-Factor Authentication Helps Protect Online Accounts",
            description:
                "Security experts recommend enabling multi-factor authentication on email, social media and financial accounts.",
            category: "Account Security",
            date: "26 September 2026",
            severity: "Medium"
        },

        {
            title: "New Malware Campaign Spreads Through Malicious Attachments",
            description:
                "Users are advised not to open unexpected email attachments and to keep security software updated.",
            category: "Malware",
            date: "25 September 2026",
            severity: "High"
        },

        {
            title: "Cyber Attack Awareness Alert",
            description:
                "Organizations should monitor unusual login activity, suspicious network traffic and unexpected system changes.",
            category: "Cyber Attack",
            date: "24 September 2026",
            severity: "Medium"
        },

        {
            title: "Password Security Remains Important",
            description:
                "Using unique passwords together with multi-factor authentication can reduce the risk of account compromise.",
            category: "Password Security",
            date: "23 September 2026",
            severity: "Medium"
        }

    ];

    res.json(news);

});

// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/api/health", function (req, res) {

    return res.json({

        success: true,

        message:
            "CyberShield server is working."
    });
});

// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, function () {

    console.log("");
    console.log("======================================");
    console.log("       CYBERSHIELD SERVER RUNNING");
    console.log("======================================");
    console.log("Website: http://localhost:3000");
    console.log("Chatbot: http://localhost:3000/chatbot.html");
    console.log("Scanner: http://localhost:3000/scanner.html");
    console.log("News:    http://localhost:3000/news.html");
    console.log("======================================");
    console.log("");
});