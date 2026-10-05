/* =========================================================
   PORTFOLIO ADMIN SYSTEM
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
            description:
                "Security fundamentals, threat detection and security operations.",
            level: 85
        },
        {
            name: "Web Development",
            description:
                "Building responsive and functional web applications.",
            level: 90
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
        }
    ],

    education: [
        {
            institution: "Sunyani Technical University",
            program:
                "Information and Communication Technology",
            period: "2024 - Present",
            description:
                "Studying information and communication technology with interests in cybersecurity, software development and cloud computing."
        }
    ],

    certifications: [
        {
            name:
                "Google Cybersecurity Professional Certificate",
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
        }
    ]

};


/* =========================================================
   DATA MANAGEMENT
========================================================= */

function getPortfolioData() {

    const saved =
        localStorage.getItem("portfolioData");

    if (!saved) {

        localStorage.setItem(
            "portfolioData",
            JSON.stringify(defaultPortfolio)
        );

        return cloneData(defaultPortfolio);
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(error);

        return cloneData(defaultPortfolio);
    }
}


function savePortfolioData() {

    localStorage.setItem(
        "portfolioData",
        JSON.stringify(portfolioData)
    );
}


function cloneData(data) {

    return JSON.parse(
        JSON.stringify(data)
    );
}


let portfolioData =
    getPortfolioData();


/* =========================================================
   LOGIN
========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


function checkLogin() {

    const loggedIn =
        sessionStorage.getItem(
            "portfolioAdminLoggedIn"
        );


    if (loggedIn === "true") {

        showAdmin();

    } else {

        showLogin();

    }
}


function showLogin() {

    const login =
        document.getElementById(
            "loginScreen"
        );

    const app =
        document.getElementById(
            "adminApp"
        );


    if (login)
        login.style.display = "flex";

    if (app)
        app.style.display = "none";
}


function showAdmin() {

    const login =
        document.getElementById(
            "loginScreen"
        );

    const app =
        document.getElementById(
            "adminApp"
        );


    if (login)
        login.style.display = "none";

    if (app)
        app.style.display = "flex";
}


function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "username"
                ).value.trim();


            const password =
                document.getElementById(
                    "password"
                ).value;


            const error =
                document.getElementById(
                    "loginError"
                );


            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                sessionStorage.setItem(
                    "portfolioAdminLoggedIn",
                    "true"
                );

                error.textContent = "";

                showAdmin();

                loadDashboard();

            } else {

                error.textContent =
                    "Invalid username or password.";

            }

        }
    );
}


/* =========================================================
   LOGOUT
========================================================= */

function setupLogout() {

    const button =
        document.getElementById(
            "logoutButton"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "portfolioAdminLoggedIn"
            );

            showLogin();

        }
    );
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            function () {

                const section =
                    this.dataset.section;

                openSection(section);

            }
        );

    });


    document
        .querySelectorAll("[data-go]")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    openSection(
                        this.dataset.go
                    );

                }
            );

        });

}


function openSection(sectionName) {

    document
        .querySelectorAll(".admin-section")
        .forEach(section => {

            section.classList.remove(
                "active"
            );

        });


    const target =
        document.getElementById(
            sectionName
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );


            if (
                item.dataset.section ===
                sectionName
            ) {

                item.classList.add(
                    "active"
                );

            }

        });


    updatePageTitle(sectionName);


    closeMobileSidebar();

}


function updatePageTitle(sectionName) {

    const title =
        document.getElementById(
            "pageTitle"
        );

    if (!title) return;


    const titles = {

        dashboard: "Dashboard",
        profile: "Profile",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        education: "Education",
        certifications: "Certifications",
        contact: "Contact",
        social: "Social Links"

    };


    title.textContent =
        titles[sectionName] ||
        "Dashboard";
}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function setupMobileSidebar() {

    const button =
        document.getElementById(
            "mobileMenu"
        );

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!button || !sidebar)
        return;


    button.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


function closeMobileSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }
}


/* =========================================================
   DASHBOARD
========================================================= */

function loadDashboard() {

    document.getElementById(
        "statSkills"
    ).textContent =
        portfolioData.skills.length;


    document.getElementById(
        "statProjects"
    ).textContent =
        portfolioData.projects.length;


    document.getElementById(
        "statEducation"
    ).textContent =
        portfolioData.education.length;


    document.getElementById(
        "statCertificates"
    ).textContent =
        portfolioData.certifications.length;
}


/* =========================================================
   PROFILE
========================================================= */

function loadProfileForm() {

    document.getElementById(
        "profileName"
    ).value =
        portfolioData.profile.name;


    document.getElementById(
        "profileTitle"
    ).value =
        portfolioData.profile.title;


    document.getElementById(
        "profileGreeting"
    ).value =
        portfolioData.profile.greeting;


    document.getElementById(
        "profileDescription"
    ).value =
        portfolioData.profile.description;


    document.getElementById(
        "profileImage"
    ).value =
        portfolioData.profile.image;
}


function setupProfileForm() {

    const form =
        document.getElementById(
            "profileForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            portfolioData.profile.name =
                document.getElementById(
                    "profileName"
                ).value.trim();


            portfolioData.profile.title =
                document.getElementById(
                    "profileTitle"
                ).value.trim();


            portfolioData.profile.greeting =
                document.getElementById(
                    "profileGreeting"
                ).value.trim();


            portfolioData.profile.description =
                document.getElementById(
                    "profileDescription"
                ).value.trim();


            portfolioData.profile.image =
                document.getElementById(
                    "profileImage"
                ).value.trim();


            savePortfolioData();


            notify(
                "Profile updated successfully."
            );

        }
    );
}


/* =========================================================
   ABOUT
========================================================= */

function loadAboutForm() {

    document.getElementById(
        "aboutDescription"
    ).value =
        portfolioData.about.description;


    document.getElementById(
        "aboutLocation"
    ).value =
        portfolioData.about.location;


    document.getElementById(
        "aboutEmail"
    ).value =
        portfolioData.about.email;


    document.getElementById(
        "aboutAvailability"
    ).value =
        portfolioData.about.availability;
}


function setupAboutForm() {

    const form =
        document.getElementById(
            "aboutForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            portfolioData.about.description =
                document.getElementById(
                    "aboutDescription"
                ).value.trim();


            portfolioData.about.location =
                document.getElementById(
                    "aboutLocation"
                ).value.trim();


            portfolioData.about.email =
                document.getElementById(
                    "aboutEmail"
                ).value.trim();


            portfolioData.about.availability =
                document.getElementById(
                    "aboutAvailability"
                ).value.trim();


            savePortfolioData();


            notify(
                "About information updated."
            );

        }
    );
}


/* =========================================================
   SKILLS
========================================================= */

function renderSkills() {

    const container =
        document.getElementById(
            "skillsList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        portfolioData.skills.length === 0
    ) {

        container.innerHTML =
            emptyAdminMessage(
                "No skills added yet."
            );

        return;
    }


    portfolioData.skills.forEach(
        (skill, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "admin-item";


            item.innerHTML = `

                <div class="admin-item-info">

                    <h3>
                        ${escapeHTML(skill.name)}
                    </h3>

                    <p>
                        ${escapeHTML(skill.description)}
                    </p>

                    <small>
                        Skill level: ${skill.level}%
                    </small>

                </div>

                <div class="admin-item-actions">

                    <button
                        class="edit-button"
                        data-edit-skill="${index}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        data-delete-skill="${index}"
                    >
                        Delete
                    </button>

                </div>
            `;


            container.appendChild(item);

        }
    );


    container
        .querySelectorAll(
            "[data-edit-skill]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editSkill(
                        Number(
                            button.dataset.editSkill
                        )
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-delete-skill]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteSkill(
                        Number(
                            button.dataset.deleteSkill
                        )
                    );

                }
            );

        });

}


function editSkill(index) {

    const skill =
        portfolioData.skills[index];


    const name =
        prompt(
            "Skill name:",
            skill.name
        );

    if (name === null) return;


    const description =
        prompt(
            "Skill description:",
            skill.description
        );

    if (description === null) return;


    let level =
        prompt(
            "Skill level (0 - 100):",
            skill.level
        );

    if (level === null) return;


    level =
        Math.max(
            0,
            Math.min(
                100,
                Number(level)
            )
        );


    portfolioData.skills[index] = {

        name: name.trim(),

        description:
            description.trim(),

        level: level

    };


    savePortfolioData();

    renderSkills();

    loadDashboard();

    notify(
        "Skill updated."
    );
}


function addSkill() {

    const name =
        prompt(
            "Enter skill name:"
        );

    if (!name) return;


    const description =
        prompt(
            "Enter skill description:"
        );

    if (!description) return;


    let level =
        prompt(
            "Skill level (0 - 100):",
            "80"
        );


    if (level === null)
        return;


    level =
        Math.max(
            0,
            Math.min(
                100,
                Number(level)
            )
        );


    portfolioData.skills.push({

        name: name.trim(),

        description:
            description.trim(),

        level: level

    });


    savePortfolioData();

    renderSkills();

    loadDashboard();

    notify(
        "Skill added successfully."
    );
}


function deleteSkill(index) {

    if (
        !confirm(
            "Delete this skill?"
        )
    ) return;


    portfolioData.skills.splice(
        index,
        1
    );


    savePortfolioData();

    renderSkills();

    loadDashboard();

    notify(
        "Skill deleted."
    );
}


/* =========================================================
   PROJECTS
========================================================= */

function renderProjects() {

    const container =
        document.getElementById(
            "projectsList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        portfolioData.projects.length === 0
    ) {

        container.innerHTML =
            emptyAdminMessage(
                "No projects added yet."
            );

        return;
    }


    portfolioData.projects.forEach(
        (project, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "admin-item";


            item.innerHTML = `

                <div class="admin-item-info">

                    <h3>
                        ${escapeHTML(project.title)}
                    </h3>

                    <p>
                        ${escapeHTML(project.description)}
                    </p>

                    <small>
                        ${
                            project.technologies.join(
                                ", "
                            )
                        }
                    </small>

                </div>

                <div class="admin-item-actions">

                    <button
                        class="edit-button"
                        data-edit-project="${index}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        data-delete-project="${index}"
                    >
                        Delete
                    </button>

                </div>
            `;


            container.appendChild(item);

        }
    );


    container
        .querySelectorAll(
            "[data-edit-project]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editProject(
                        Number(
                            button.dataset.editProject
                        )
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-delete-project]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteProject(
                        Number(
                            button.dataset.deleteProject
                        )
                    );

                }
            );

        });

}


function addProject() {

    const title =
        prompt(
            "Project title:"
        );

    if (!title) return;


    const description =
        prompt(
            "Project description:"
        );

    if (!description) return;


    const image =
        prompt(
            "Project image URL:",
            "assets/images/project-placeholder.jpg"
        );

    if (image === null) return;


    const tech =
        prompt(
            "Technologies separated by commas:",
            "HTML, CSS, JavaScript"
        );

    if (tech === null) return;


    const github =
        prompt(
            "GitHub URL:",
            "#"
        );

    if (github === null) return;


    const demo =
        prompt(
            "Live demo URL:",
            "#"
        );

    if (demo === null) return;


    portfolioData.projects.push({

        title: title.trim(),

        description:
            description.trim(),

        image: image.trim(),

        technologies:
            tech
                .split(",")
                .map(item => item.trim())
                .filter(Boolean),

        github: github.trim(),

        demo: demo.trim()

    });


    savePortfolioData();

    renderProjects();

    loadDashboard();

    notify(
        "Project added successfully."
    );
}


function editProject(index) {

    const project =
        portfolioData.projects[index];


    const title =
        prompt(
            "Project title:",
            project.title
        );

    if (title === null) return;


    const description =
        prompt(
            "Project description:",
            project.description
        );

    if (description === null) return;


    const image =
        prompt(
            "Project image URL:",
            project.image
        );

    if (image === null) return;


    const tech =
        prompt(
            "Technologies separated by commas:",
            project.technologies.join(", ")
        );

    if (tech === null) return;


    const github =
        prompt(
            "GitHub URL:",
            project.github
        );

    if (github === null) return;


    const demo =
        prompt(
            "Live demo URL:",
            project.demo
        );

    if (demo === null) return;


    portfolioData.projects[index] = {

        title: title.trim(),

        description:
            description.trim(),

        image: image.trim(),

        technologies:
            tech
                .split(",")
                .map(item => item.trim())
                .filter(Boolean),

        github: github.trim(),

        demo: demo.trim()

    };


    savePortfolioData();

    renderProjects();

    notify(
        "Project updated."
    );
}


function deleteProject(index) {

    if (
        !confirm(
            "Delete this project?"
        )
    ) return;


    portfolioData.projects.splice(
        index,
        1
    );


    savePortfolioData();

    renderProjects();

    loadDashboard();

    notify(
        "Project deleted."
    );
}


/* =========================================================
   EDUCATION
========================================================= */

function renderEducation() {

    const container =
        document.getElementById(
            "educationList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        portfolioData.education.length === 0
    ) {

        container.innerHTML =
            emptyAdminMessage(
                "No education records added."
            );

        return;
    }


    portfolioData.education.forEach(
        (item, index) => {

            const element =
                document.createElement(
                    "div"
                );

            element.className =
                "admin-item";


            element.innerHTML = `

                <div class="admin-item-info">

                    <h3>
                        ${escapeHTML(item.institution)}
                    </h3>

                    <p>
                        ${escapeHTML(item.program)}
                    </p>

                    <small>
                        ${escapeHTML(item.period)}
                    </small>

                </div>

                <div class="admin-item-actions">

                    <button
                        class="edit-button"
                        data-edit-education="${index}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        data-delete-education="${index}"
                    >
                        Delete
                    </button>

                </div>
            `;


            container.appendChild(element);

        }
    );


    container
        .querySelectorAll(
            "[data-edit-education]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editEducation(
                        Number(
                            button.dataset.editEducation
                        )
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-delete-education]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteEducation(
                        Number(
                            button.dataset.deleteEducation
                        )
                    );

                }
            );

        });

}


function addEducation() {

    const institution =
        prompt(
            "Institution:"
        );

    if (!institution) return;


    const program =
        prompt(
            "Program:"
        );

    if (!program) return;


    const period =
        prompt(
            "Period:",
            "2024 - Present"
        );

    if (period === null) return;


    const description =
        prompt(
            "Description:"
        );

    if (description === null) return;


    portfolioData.education.push({

        institution:
            institution.trim(),

        program:
            program.trim(),

        period:
            period.trim(),

        description:
            description.trim()

    });


    savePortfolioData();

    renderEducation();

    loadDashboard();

    notify(
        "Education added."
    );
}


function editEducation(index) {

    const item =
        portfolioData.education[index];


    const institution =
        prompt(
            "Institution:",
            item.institution
        );

    if (institution === null) return;


    const program =
        prompt(
            "Program:",
            item.program
        );

    if (program === null) return;


    const period =
        prompt(
            "Period:",
            item.period
        );

    if (period === null) return;


    const description =
        prompt(
            "Description:",
            item.description
        );

    if (description === null) return;


    portfolioData.education[index] = {

        institution:
            institution.trim(),

        program:
            program.trim(),

        period:
            period.trim(),

        description:
            description.trim()

    };


    savePortfolioData();

    renderEducation();

    notify(
        "Education updated."
    );
}


function deleteEducation(index) {

    if (
        !confirm(
            "Delete this education record?"
        )
    ) return;


    portfolioData.education.splice(
        index,
        1
    );


    savePortfolioData();

    renderEducation();

    loadDashboard();

    notify(
        "Education deleted."
    );
}


/* =========================================================
   CERTIFICATIONS
========================================================= */

function renderCertificates() {

    const container =
        document.getElementById(
            "certificatesList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        portfolioData.certifications.length === 0
    ) {

        container.innerHTML =
            emptyAdminMessage(
                "No certificates added."
            );

        return;
    }


    portfolioData.certifications.forEach(
        (certificate, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "admin-item";


            item.innerHTML = `

                <div class="admin-item-info">

                    <h3>
                        ${escapeHTML(certificate.name)}
                    </h3>

                    <p>
                        ${escapeHTML(certificate.organization)}
                    </p>

                    <small>
                        ${escapeHTML(certificate.year)}
                    </small>

                </div>

                <div class="admin-item-actions">

                    <button
                        class="edit-button"
                        data-edit-certificate="${index}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        data-delete-certificate="${index}"
                    >
                        Delete
                    </button>

                </div>
            `;


            container.appendChild(item);

        }
    );


    container
        .querySelectorAll(
            "[data-edit-certificate]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editCertificate(
                        Number(
                            button.dataset.editCertificate
                        )
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-delete-certificate]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteCertificate(
                        Number(
                            button.dataset.deleteCertificate
                        )
                    );

                }
            );

        });

}


function addCertificate() {

    const name =
        prompt(
            "Certificate name:"
        );

    if (!name) return;


    const organization =
        prompt(
            "Issuing organization:"
        );

    if (!organization) return;


    const year =
        prompt(
            "Year:"
        );

    if (year === null) return;


    const link =
        prompt(
            "Certificate URL:",
            "#"
        );

    if (link === null) return;


    portfolioData.certifications.push({

        name:
            name.trim(),

        organization:
            organization.trim(),

        year:
            year.trim(),

        link:
            link.trim()

    });


    savePortfolioData();

    renderCertificates();

    loadDashboard();

    notify(
        "Certificate added."
    );
}


function editCertificate(index) {

    const certificate =
        portfolioData.certifications[index];


    const name =
        prompt(
            "Certificate name:",
            certificate.name
        );

    if (name === null) return;


    const organization =
        prompt(
            "Issuing organization:",
            certificate.organization
        );

    if (organization === null) return;


    const year =
        prompt(
            "Year:",
            certificate.year
        );

    if (year === null) return;


    const link =
        prompt(
            "Certificate URL:",
            certificate.link
        );

    if (link === null) return;


    portfolioData.certifications[index] = {

        name:
            name.trim(),

        organization:
            organization.trim(),

        year:
            year.trim(),

        link:
            link.trim()

    };


    savePortfolioData();

    renderCertificates();

    notify(
        "Certificate updated."
    );
}


function deleteCertificate(index) {

    if (
        !confirm(
            "Delete this certificate?"
        )
    ) return;


    portfolioData.certifications.splice(
        index,
        1
    );


    savePortfolioData();

    renderCertificates();

    loadDashboard();

    notify(
        "Certificate deleted."
    );
}


/* =========================================================
   CONTACT
========================================================= */

function loadContactForm() {

    document.getElementById(
        "contactDescription"
    ).value =
        portfolioData.contact.description;


    document.getElementById(
        "contactEmail"
    ).value =
        portfolioData.contact.email;


    document.getElementById(
        "contactPhone"
    ).value =
        portfolioData.contact.phone;
}


function setupContactForm() {

    const form =
        document.getElementById(
            "contactFormAdmin"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            portfolioData.contact.description =
                document.getElementById(
                    "contactDescription"
                ).value.trim();


            portfolioData.contact.email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();


            portfolioData.contact.phone =
                document.getElementById(
                    "contactPhone"
                ).value.trim();


            savePortfolioData();


            notify(
                "Contact information updated."
            );

        }
    );
}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function renderSocial() {

    const container =
        document.getElementById(
            "socialList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        portfolioData.social.length === 0
    ) {

        container.innerHTML =
            emptyAdminMessage(
                "No social links added."
            );

        return;
    }


    portfolioData.social.forEach(
        (social, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "admin-item";


            item.innerHTML = `

                <div class="admin-item-info">

                    <h3>
                        ${escapeHTML(social.name)}
                    </h3>

                    <p>
                        ${escapeHTML(social.url)}
                    </p>

                </div>

                <div class="admin-item-actions">

                    <button
                        class="edit-button"
                        data-edit-social="${index}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        data-delete-social="${index}"
                    >
                        Delete
                    </button>

                </div>
            `;


            container.appendChild(item);

        }
    );


    container
        .querySelectorAll(
            "[data-edit-social]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editSocial(
                        Number(
                            button.dataset.editSocial
                        )
                    );

                }
            );

        });


    container
        .querySelectorAll(
            "[data-delete-social]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteSocial(
                        Number(
                            button.dataset.deleteSocial
                        )
                    );

                }
            );

        });

}


function addSocial() {

    const name =
        prompt(
            "Platform name:"
        );

    if (!name) return;


    const url =
        prompt(
            "Profile URL:"
        );

    if (!url) return;


    portfolioData.social.push({

        name:
            name.trim(),

        url:
            url.trim()

    });


    savePortfolioData();

    renderSocial();

    notify(
        "Social link added."
    );
}


function editSocial(index) {

    const social =
        portfolioData.social[index];


    const name =
        prompt(
            "Platform name:",
            social.name
        );

    if (name === null) return;


    const url =
        prompt(
            "Profile URL:",
            social.url
        );

    if (url === null) return;


    portfolioData.social[index] = {

        name:
            name.trim(),

        url:
            url.trim()

    };


    savePortfolioData();

    renderSocial();

    notify(
        "Social link updated."
    );
}


function deleteSocial(index) {

    if (
        !confirm(
            "Delete this social link?"
        )
    ) return;


    portfolioData.social.splice(
        index,
        1
    );


    savePortfolioData();

    renderSocial();

    notify(
        "Social link deleted."
    );
}


/* =========================================================
   BUTTON EVENTS
========================================================= */

function setupActionButtons() {

    document
        .getElementById("addSkill")
        ?.addEventListener(
            "click",
            addSkill
        );


    document
        .getElementById("addProject")
        ?.addEventListener(
            "click",
            addProject
        );


    document
        .getElementById("addEducation")
        ?.addEventListener(
            "click",
            addEducation
        );


    document
        .getElementById("addCertificate")
        ?.addEventListener(
            "click",
            addCertificate
        );


    document
        .getElementById("addSocial")
        ?.addEventListener(
            "click",
            addSocial
        );

}


/* =========================================================
   RESET DATA
========================================================= */

function setupReset() {

    const button =
        document.getElementById(
            "resetData"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            const confirmed =
                confirm(
                    "This will delete all your current portfolio changes and restore the default data. Continue?"
                );


            if (!confirmed)
                return;


            portfolioData =
                cloneData(
                    defaultPortfolio
                );


            savePortfolioData();


            loadAllAdminData();


            notify(
                "Portfolio data has been reset."
            );

        }
    );
}


/* =========================================================
   NOTIFICATION
========================================================= */

function notify(message) {

    let notification =
        document.getElementById(
            "adminNotification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "adminNotification";


        notification.style.position =
            "fixed";

        notification.style.right =
            "25px";

        notification.style.bottom =
            "25px";

        notification.style.zIndex =
            "99999";

        notification.style.padding =
            "13px 18px";

        notification.style.background =
            "#172033";

        notification.style.color =
            "#ffffff";

        notification.style.borderRadius =
            "9px";

        notification.style.fontSize =
            "13px";

        notification.style.fontWeight =
            "600";

        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.15)";

        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.style.display =
        "block";


    clearTimeout(
        notification.timer
    );


    notification.timer =
        setTimeout(
            () => {

                notification.style.display =
                    "none";

            },
            2500
        );
}


/* =========================================================
   EMPTY ADMIN MESSAGE
========================================================= */

function emptyAdminMessage(message) {

    return `

        <div
            class="admin-item"
            style="justify-content:center;"
        >

            <p
                style="
                    color:#64748b;
                    font-size:.85rem;
                "
            >
                ${escapeHTML(message)}
            </p>

        </div>

    `;

}


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   LOAD EVERYTHING
========================================================= */

function loadAllAdminData() {

    loadDashboard();

    loadProfileForm();

    loadAboutForm();

    renderSkills();

    renderProjects();

    renderEducation();

    renderCertificates();

    loadContactForm();

    renderSocial();

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupLogin();

        setupLogout();

        setupNavigation();

        setupMobileSidebar();

        setupProfileForm();

        setupAboutForm();

        setupContactForm();

        setupActionButtons();

        setupReset();


        checkLogin();


        if (
            sessionStorage.getItem(
                "portfolioAdminLoggedIn"
            ) === "true"
        ) {

            loadAllAdminData();

        }

    }
);