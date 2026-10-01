// ==========================================
// CyberShield Incident Response Center
// ==========================================

const incidentContent =
    document.getElementById(
        "incidentContent"
    );

const incidentOptions =
    document.querySelectorAll(
        ".incident-option"
    );


// ==========================================
// Incident information
// ==========================================

const incidents = {

    account: {

        icon: "🔐",

        title: "Account Hacked",

        intro:
            "Someone may have gained unauthorized access to one of your online accounts.",

        happened:
            "An account can be compromised after a stolen password, phishing attack, reused password or unauthorized login.",

        actions: [
            "Change the account password from a trusted device.",
            "Enable multi-factor authentication if available.",
            "Sign out unknown or suspicious sessions.",
            "Check recovery email addresses and phone numbers.",
            "Review recent account activity.",
            "Contact the service provider if you cannot regain control."
        ],

        dont: [
            "Do not share your password or OTP with anyone.",
            "Do not click suspicious recovery links.",
            "Do not reuse the compromised password on other websites."
        ],

        evidence: [
            "Screenshots of suspicious activity.",
            "Login notification emails.",
            "Unknown device or session information.",
            "Relevant messages or suspicious links."
        ],

        recovery: [
            "Secure your email account first if it is connected to the affected account.",
            "Change reused passwords on other services.",
            "Enable MFA.",
            "Review account recovery settings."
        ],

        prevention: [
            "Use unique passwords.",
            "Enable MFA.",
            "Keep software updated.",
            "Learn how to recognize phishing."
        ]

    },


    phone: {

        icon: "📱",

        title: "Phone Hacked or Compromised",

        intro:
            "Your phone may show unusual behavior such as unknown applications, unexpected account activity or suspicious messages.",

        happened:
            "A compromised phone can result from malicious applications, phishing, stolen credentials or outdated software.",

        actions: [
            "Disconnect from suspicious networks if necessary.",
            "Review recently installed applications.",
            "Update the phone operating system.",
            "Change important account passwords from a trusted device.",
            "Enable screen lock and MFA.",
            "Use a trusted mobile security solution when appropriate."
        ],

        dont: [
            "Do not install unknown security applications from random links.",
            "Do not provide remote access to an unknown person.",
            "Do not ignore repeated suspicious account notifications."
        ],

        evidence: [
            "Screenshots of suspicious applications.",
            "Suspicious SMS messages.",
            "Unknown login alerts.",
            "Dates and times of unusual activity."
        ],

        recovery: [
            "Remove suspicious applications.",
            "Secure important accounts.",
            "Update the device.",
            "If compromise continues, contact the device manufacturer or qualified professional."
        ],

        prevention: [
            "Install applications only from trusted sources.",
            "Keep your phone updated.",
            "Use a strong device lock.",
            "Review application permissions."
        ]

    },


    scam: {

        icon: "🎣",

        title: "Online Scam",

        intro:
            "You may have been tricked into sending money, information or credentials through an online interaction.",

        happened:
            "Scams commonly use social engineering, fake offers, impersonation, urgency or fraudulent websites.",

        actions: [
            "Stop communicating with the suspected scammer.",
            "Do not send additional money.",
            "Contact the relevant payment provider immediately.",
            "Change passwords if credentials were shared.",
            "Report the scam through the relevant official service."
        ],

        dont: [
            "Do not pay someone who promises to recover your money without verification.",
            "Do not provide additional OTPs or passwords.",
            "Do not delete useful evidence before saving it."
        ],

        evidence: [
            "Screenshots.",
            "Chat messages.",
            "Email addresses.",
            "Phone numbers.",
            "Payment or transaction information.",
            "Website addresses."
        ],

        recovery: [
            "Contact your bank or payment provider.",
            "Secure affected accounts.",
            "Monitor financial accounts.",
            "Report the incident through appropriate official channels."
        ],

        prevention: [
            "Verify unexpected requests.",
            "Avoid urgent payment demands.",
            "Never share OTPs.",
            "Use official websites and applications."
        ]

    },


    upi: {

        icon: "💳",

        title: "UPI / Bank Fraud",

        intro:
            "A suspicious or unauthorized financial transaction may require immediate action.",

        happened:
            "Financial fraud can involve unauthorized transactions, social engineering, fake payment requests or compromised accounts.",

        actions: [
            "Contact your bank or payment provider immediately.",
            "Use the official customer-support or fraud-reporting channel.",
            "Secure your banking and email accounts.",
            "Block or freeze payment instruments when appropriate.",
            "Record transaction IDs and relevant details."
        ],

        dont: [
            "Do not share OTPs, PINs or passwords.",
            "Do not follow instructions from an unknown caller claiming to be support.",
            "Do not delete transaction evidence."
        ],

        evidence: [
            "Transaction ID.",
            "Transaction date and time.",
            "Amount.",
            "Screenshots.",
            "SMS or email alerts.",
            "Relevant phone numbers or messages."
        ],

        recovery: [
            "Follow your bank or payment provider's fraud response process.",
            "Change compromised credentials.",
            "Monitor your account for additional activity.",
            "Contact relevant official authorities where appropriate."
        ],

        prevention: [
            "Never share UPI PIN or OTP.",
            "Verify payment requests.",
            "Use official banking applications.",
            "Enable transaction alerts."
        ]

    },


    malware: {

        icon: "🦠",

        title: "Malware Infection",

        intro:
            "Malware is software designed to perform unwanted or harmful actions on a device.",

        happened:
            "Malware can arrive through malicious downloads, attachments, compromised websites or unsafe applications.",

        actions: [
            "Disconnect the affected device from the network if appropriate.",
            "Avoid opening suspicious files.",
            "Run a trusted security scan.",
            "Update the operating system and security software.",
            "Change important passwords from a trusted device."
        ],

        dont: [
            "Do not continue opening suspicious files.",
            "Do not install random 'cleanup' tools from pop-up advertisements.",
            "Do not ignore repeated security warnings."
        ],

        evidence: [
            "Suspicious file names.",
            "Security software alerts.",
            "Screenshots.",
            "Suspicious emails or download links."
        ],

        recovery: [
            "Remove confirmed malicious software using trusted tools.",
            "Restore files from trusted backups when necessary.",
            "Update the system.",
            "Seek professional assistance if the infection cannot be removed."
        ],

        prevention: [
            "Keep software updated.",
            "Use trusted security software.",
            "Avoid pirated software.",
            "Do not open unexpected attachments."
        ]

    },


    ransomware: {

        icon: "🔒",

        title: "Ransomware",

        intro:
            "Ransomware can prevent access to files or systems and may demand payment.",

        happened:
            "Ransomware can spread through malicious files, compromised credentials, vulnerable systems or other attack paths.",

        actions: [
            "Disconnect the affected device from networks when safe to do so.",
            "Do not continue interacting with suspicious files.",
            "Notify your organization's IT/security team if applicable.",
            "Preserve relevant evidence.",
            "Use trusted backups if available.",
            "Contact appropriate cybersecurity or law-enforcement resources for serious incidents."
        ],

        dont: [
            "Do not assume paying guarantees recovery.",
            "Do not destroy evidence.",
            "Do not connect clean backup devices to a potentially infected system."
        ],

        evidence: [
            "Ransom notes.",
            "File extensions.",
            "Screenshots.",
            "Timestamps.",
            "Suspicious emails or files.",
            "Security alerts."
        ],

        recovery: [
            "Identify and isolate affected systems.",
            "Determine the scope of the incident.",
            "Restore from trusted backups where possible.",
            "Reset compromised credentials.",
            "Consider professional incident-response assistance."
        ],

        prevention: [
            "Maintain tested backups.",
            "Use MFA.",
            "Patch systems.",
            "Limit unnecessary administrative privileges.",
            "Train users about phishing."
        ]

    },


    social: {

        icon: "👤",

        title: "Social Media Account Hacked",

        intro:
            "An attacker may have accessed your social media account and could use it to impersonate you.",

        happened:
            "Social media accounts may be compromised through phishing, password reuse, malicious applications or stolen sessions.",

        actions: [
            "Change the password using the official application or website.",
            "Sign out unknown sessions.",
            "Enable MFA.",
            "Check recovery email and phone settings.",
            "Warn contacts if suspicious messages were sent."
        ],

        dont: [
            "Do not communicate with someone claiming they can recover the account for money without verification.",
            "Do not share recovery codes.",
            "Do not reuse the compromised password."
        ],

        evidence: [
            "Suspicious posts.",
            "Login alerts.",
            "Unknown messages.",
            "Screenshots of account changes."
        ],

        recovery: [
            "Use the platform's official account recovery process.",
            "Secure the connected email account.",
            "Remove unknown applications.",
            "Review account permissions."
        ],

        prevention: [
            "Enable MFA.",
            "Use a unique password.",
            "Review connected applications.",
            "Avoid suspicious direct messages."
        ]

    },


    email: {

        icon: "✉️",

        title: "Email Account Hacked",

        intro:
            "A compromised email account can be especially important because it may be used to reset other accounts.",

        happened:
            "Attackers can gain access through phishing, password reuse, stolen sessions or weak security settings.",

        actions: [
            "Change the email password immediately from a trusted device.",
            "Enable MFA.",
            "Sign out other sessions.",
            "Check forwarding rules and recovery settings.",
            "Review sent messages and account activity.",
            "Secure other accounts that use this email address."
        ],

        dont: [
            "Do not ignore unfamiliar forwarding rules.",
            "Do not share recovery codes.",
            "Do not use the same password elsewhere."
        ],

        evidence: [
            "Login alerts.",
            "Unknown forwarding rules.",
            "Suspicious sent messages.",
            "Recovery setting changes."
        ],

        recovery: [
            "Recover the email account using the provider's official process.",
            "Change reused passwords on other accounts.",
            "Check important financial and social accounts.",
            "Notify contacts if fraudulent messages were sent."
        ],

        prevention: [
            "Use MFA.",
            "Use a unique strong password.",
            "Review account activity.",
            "Keep recovery information current."
        ]

    }

};


// ==========================================
// Display incident
// ==========================================

function showIncident(type) {

    const incident =
        incidents[type];

    if (!incident) {
        return;
    }


    incidentContent.innerHTML = "";


    const titleSection =
        document.createElement("div");

    titleSection.className =
        "incident-title";


    const icon =
        document.createElement("div");

    icon.className =
        "incident-title-icon";

    icon.textContent =
        incident.icon;


    const titleText =
        document.createElement("div");


    const heading =
        document.createElement("h2");

    heading.textContent =
        incident.title;


    const intro =
        document.createElement("p");

    intro.className =
        "intro";

    intro.textContent =
        incident.intro;


    titleText.appendChild(heading);
    titleText.appendChild(intro);

    titleSection.appendChild(icon);
    titleSection.appendChild(titleText);

    incidentContent.appendChild(
        titleSection
    );


    addResponseBlock(
        "1. What happened?",
        incident.happened,
        "response-block"
    );


    addListBlock(
        "2. Immediate Actions",
        incident.actions,
        "response-block"
    );


    addListBlock(
        "3. What NOT to do",
        incident.dont,
        "response-block warning-block"
    );


    addListBlock(
        "4. Evidence to Save",
        incident.evidence,
        "response-block evidence-block"
    );


    addListBlock(
        "5. Recovery Steps",
        incident.recovery,
        "response-block"
    );


    addListBlock(
        "6. Prevention Tips",
        incident.prevention,
        "response-block"
    );

}


// ==========================================
// Add paragraph block
// ==========================================

function addResponseBlock(
    title,
    text,
    className
) {

    const block =
        document.createElement("div");

    block.className =
        className;


    const heading =
        document.createElement("h3");

    heading.textContent =
        title;


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        text;


    block.appendChild(heading);
    block.appendChild(paragraph);

    incidentContent.appendChild(block);

}


// ==========================================
// Add list block
// ==========================================

function addListBlock(
    title,
    items,
    className
) {

    const block =
        document.createElement("div");

    block.className =
        className;


    const heading =
        document.createElement("h3");

    heading.textContent =
        title;


    const list =
        document.createElement("ul");


    items.forEach(
        (item) => {

            const li =
                document.createElement("li");

            li.textContent =
                item;

            list.appendChild(li);

        }
    );


    block.appendChild(heading);
    block.appendChild(list);

    incidentContent.appendChild(block);

}


// ==========================================
// Button events
// ==========================================

incidentOptions.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                incidentOptions.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                showIncident(
                    button.dataset.incident
                );

            }
        );

    }
);


// Show default incident
showIncident("account");