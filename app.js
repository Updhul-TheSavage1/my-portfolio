/* =========================================================
   PORTFOLIO APPLICATION
========================================================= */


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultPortfolio = {

    profile: {
        name: "Your Name",
        title: "Cybersecurity Enthusiast & Software Developer",
        greeting: "Hello, I'm",
        description:
            "I build secure, useful and modern digital solutions while continuously developing my skills in technology.",
        image: "assets/images/profile.jpg"
    },


    about: {
        description:
            "I am passionate about technology, software development and cybersecurity. I enjoy solving problems, learning new technologies and building practical digital solutions.",
        location: "Ghana",
        email: "example@email.com",
        availability: "Available"
    },


    skills: [
        {
            name: "Cybersecurity",
            description: "Security fundamentals, threat detection and security operations.",
            level: 85
        },

        {
            name: "Web Development",
            description: "Building responsive and functional web applications.",
            level: 90
        },

        {
            name: "JavaScript",
            description: "Frontend development and interactive web applications.",
            level: 80
        },

        {
            name: "PHP",
            description: "Backend development and database-driven applications.",
            level: 75
        },

        {
            name: "MySQL",
            description: "Database design, queries and data management.",
            level: 75
        },

        {
            name: "Networking",
            description: "Networking concepts, protocols and infrastructure.",
            level: 70
        }
    ],


    projects: [
        {
            title: "Banking Collection Management System",
            description:
                "A web-based system for managing customers, collection books, deposits and withdrawals.",
            image: "assets/images/project-placeholder.jpg",
            technologies: [
                "PHP",
                "MySQL",
                "JavaScript",
                "HTML",
                "CSS"
            ],
            github: "#",
            demo: "#"
        },

        {
            title: "Cybersecurity Project",
            description:
                "A practical cybersecurity project focused on security monitoring and threat detection.",
            image: "assets/images/project-placeholder.jpg",
            technologies: [
                "Cybersecurity",
                "Linux",
                "Networking"
            ],
            github: "#",
            demo: "#"
        }
    ],


    education: [
        {
            institution: "Sunyani Technical University",
            program: "Information and Communication Technology",
            period: "2024 - Present",
            description:
                "Studying information and communication technology with interests in cybersecurity, software development and cloud computing."
        }
    ],


    certifications: [
        {
            name: "Google Cybersecurity Professional Certificate",
            organization: "Google",
            year: "2026",
            link: "#"
        }
    ],


    contact: {
        description:
            "Have a project, opportunity or question? Feel free to get in touch.",
        email: "example@email.com",
        phone: "+233 XX XXX XXXX"
    },


    social: [
        {
            name: "GitHub",
            url: "#"
        },

        {
            name: "LinkedIn",
            url: "#"
        },

        {
            name: "Instagram",
            url: "#"
        }
    ]

};


/* =========================================================
   LOAD DATA
========================================================= */

function getPortfolioData() {

    const savedData =
        localStorage.getItem("portfolioData");

    if (!savedData) {

        localStorage.setItem(
            "portfolioData",
            JSON.stringify(defaultPortfolio)
        );

        return defaultPortfolio;
    }

    try {

        return JSON.parse(savedData);

    } catch (error) {

        console.error(
            "Portfolio data could not be loaded:",
            error
        );

        return defaultPortfolio;
    }
}


const portfolio = getPortfolioData();


/* =========================================================
   BASIC PROFILE
========================================================= */

function loadProfile() {

    const name =
        document.getElementById("heroName");

    const title =
        document.getElementById("heroTitle");

    const greeting =
        document.getElementById("heroGreeting");

    const description =
        document.getElementById("heroDescription");

    const image =
        document.getElementById("profileImage");

    const footerName =
        document.getElementById("footerName");


    if (name)
        name.textContent = portfolio.profile.name;

    if (title)
        title.textContent = portfolio.profile.title;

    if (greeting)
        greeting.textContent = portfolio.profile.greeting;

    if (description)
        description.textContent =
            portfolio.profile.description;

    if (image)
        image.src = portfolio.profile.image;

    if (footerName)
        footerName.textContent =
            portfolio.profile.name;
}


/* =========================================================
   ABOUT
========================================================= */

function loadAbout() {

    document.getElementById(
        "aboutDescription"
    ).textContent =
        portfolio.about.description;


    document.getElementById(
        "aboutLocation"
    ).textContent =
        portfolio.about.location;


    document.getElementById(
        "aboutEmail"
    ).textContent =
        portfolio.about.email;


    document.getElementById(
        "aboutAvailability"
    ).textContent =
        portfolio.about.availability;
}


/* =========================================================
   SKILLS
========================================================= */

function loadSkills() {

    const container =
        document.getElementById(
            "skillsContainer"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        !portfolio.skills ||
        portfolio.skills.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                No skills have been added yet.
            </div>
        `;

        return;
    }


    portfolio.skills.forEach(skill => {

        const card =
            document.createElement("div");

        card.className =
            "skill-card";


        card.innerHTML = `

            <h3>${escapeHTML(skill.name)}</h3>

            <p>
                ${escapeHTML(skill.description)}
            </p>

            <div class="skill-progress">

                <span
                    style="width: ${Number(skill.level) || 0}%"
                ></span>

            </div>

        `;


        container.appendChild(card);

    });
}


/* =========================================================
   PROJECTS
========================================================= */

function loadProjects() {

    const container =
        document.getElementById(
            "projectsContainer"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        !portfolio.projects ||
        portfolio.projects.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                No projects have been added yet.
            </div>
        `;

        return;
    }


    portfolio.projects.forEach(project => {

        const card =
            document.createElement("article");

        card.className =
            "project-card";


        const technologies =
            project.technologies || [];


        card.innerHTML = `

            <img
                class="project-image"
                src="${escapeAttribute(project.image)}"
                alt="${escapeAttribute(project.title)}"
            >

            <div class="project-content">

                <h3>
                    ${escapeHTML(project.title)}
                </h3>

                <p>
                    ${escapeHTML(project.description)}
                </p>

                <div class="project-tech">

                    ${technologies.map(tech => `
                        <span>
                            ${escapeHTML(tech)}
                        </span>
                    `).join("")}

                </div>

                <div class="project-links">

                    ${
                        project.github &&
                        project.github !== "#"
                        ?
                        `
                        <a
                            href="${escapeAttribute(project.github)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        `
                        :
                        ""
                    }

                    ${
                        project.demo &&
                        project.demo !== "#"
                        ?
                        `
                        <a
                            href="${escapeAttribute(project.demo)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                        </a>
                        `
                        :
                        ""
                    }

                </div>

            </div>

        `;


        container.appendChild(card);

    });
}


/* =========================================================
   EDUCATION
========================================================= */

function loadEducation() {

    const container =
        document.getElementById(
            "educationContainer"
        );

    if (!container) return;


    container.innerHTML = "";


    portfolio.education.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "timeline-item";


        element.innerHTML = `

            <h3>
                ${escapeHTML(item.institution)}
            </h3>

            <span class="period">
                ${escapeHTML(item.period)}
            </span>

            <strong>
                ${escapeHTML(item.program)}
            </strong>

            <p>
                ${escapeHTML(item.description)}
            </p>

        `;


        container.appendChild(element);

    });
}


/* =========================================================
   CERTIFICATIONS
========================================================= */

function loadCertifications() {

    const container =
        document.getElementById(
            "certificationsContainer"
        );

    if (!container) return;


    container.innerHTML = "";


    portfolio.certifications.forEach(
        certificate => {

            const card =
                document.createElement("div");

            card.className =
                "certificate-card";


            card.innerHTML = `

                <h3>
                    ${escapeHTML(certificate.name)}
                </h3>

                <p>
                    ${escapeHTML(certificate.organization)}
                </p>

                <p>
                    ${escapeHTML(certificate.year)}
                </p>

                ${
                    certificate.link &&
                    certificate.link !== "#"
                    ?
                    `
                    <a
                        href="${escapeAttribute(certificate.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Certificate
                    </a>
                    `
                    :
                    ""
                }

            `;


            container.appendChild(card);

        }
    );
}


/* =========================================================
   CONTACT
========================================================= */

function loadContact() {

    document.getElementById(
        "contactDescription"
    ).textContent =
        portfolio.contact.description;


    document.getElementById(
        "contactEmail"
    ).textContent =
        portfolio.contact.email;


    document.getElementById(
        "contactPhone"
    ).textContent =
        portfolio.contact.phone;
}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function loadSocialLinks() {

    const container =
        document.getElementById(
            "socialLinks"
        );

    if (!container) return;


    container.innerHTML = "";


    portfolio.social.forEach(social => {

        if (!social.url || social.url === "#")
            return;


        const link =
            document.createElement("a");

        link.href =
            social.url;

        link.textContent =
            social.name;

        link.target = "_blank";

        link.rel =
            "noopener noreferrer";


        container.appendChild(link);

    });
}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const navMenu =
        document.getElementById(
            "navMenu"
        );


    if (!menuToggle || !navMenu)
        return;


    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "active"
            );

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        });
}


/* =========================================================
   DARK MODE
========================================================= */

function setupTheme() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    const savedTheme =
        localStorage.getItem(
            "portfolioTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "portfolioTheme",
                isDark ? "dark" : "light"
            );

        }
    );
}


/* =========================================================
   CONTACT FORM
========================================================= */

function setupContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            alert(
                "Thank you for your message. This contact form currently works on the frontend only."
            );


            form.reset();

        }
    );
}


/* =========================================================
   HTML SECURITY HELPERS
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);

}


/* =========================================================
   FOOTER YEAR
========================================================= */

function loadFooterYear() {

    const year =
        document.getElementById(
            "footerYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProfile();

        loadAbout();

        loadSkills();

        loadProjects();

        loadEducation();

        loadCertifications();

        loadContact();

        loadSocialLinks();

        loadFooterYear();

        setupMobileMenu();

        setupTheme();

        setupContactForm();

    }
);