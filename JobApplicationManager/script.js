// ================================
// GET HTML ELEMENTS
// ================================

const form = document.getElementById("applicationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const interviewTimeInput = document.getElementById("interviewTime");
const roleInput = document.getElementById("role");
const experienceInput = document.getElementById("experience");
const coverLetterInput = document.getElementById("coverLetter");

const profilePhotoInput = document.getElementById("profilePhoto");
const resumeInput = document.getElementById("resume");

const photoButton = document.getElementById("photoButton");
const resumeButton = document.getElementById("resumeButton");

const photoName = document.getElementById("photoName");
const resumeName = document.getElementById("resumeName");

const termsInput = document.getElementById("terms");

const applicationContainer =
    document.getElementById("applicationContainer");


// ================================
// FILE BUTTONS
// ================================

photoButton.addEventListener("click", function () {
    profilePhotoInput.click();
});

resumeButton.addEventListener("click", function () {
    resumeInput.click();
});


// Show selected photo name

profilePhotoInput.addEventListener("change", function () {

    if (profilePhotoInput.files.length > 0) {

        photoName.textContent =
            profilePhotoInput.files[0].name;

    } else {

        photoName.textContent = "No photo selected";
    }
});


// Show selected resume name

resumeInput.addEventListener("change", function () {

    if (resumeInput.files.length > 0) {

        resumeName.textContent =
            resumeInput.files[0].name;

    } else {

        resumeName.textContent = "No resume selected";
    }
});


// ================================
// ERROR MESSAGE FUNCTION
// ================================

function showError(id, message) {

    document.getElementById(id).textContent = message;
}


// ================================
// CLEAR ALL ERRORS
// ================================

function clearErrors() {

    const errors = document.querySelectorAll("small");

    errors.forEach(function (error) {
        error.textContent = "";
    });
}


// ================================
// FORM SUBMIT
// ================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let isValid = true;


    // ============================
    // NAME VALIDATION
    // ============================

    const name = nameInput.value.trim();

    if (name === "") {

        showError(
            "nameError",
            "Please enter your full name."
        );

        isValid = false;

    } else if (name.length < 3) {

        showError(
            "nameError",
            "Name must contain at least 3 characters."
        );

        isValid = false;
    }


    // ============================
    // EMAIL VALIDATION
    // ============================

    const email = emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        showError(
            "emailError",
            "Please enter your email."
        );

        isValid = false;

    } else if (!emailPattern.test(email)) {

        showError(
            "emailError",
            "Please enter a valid email address."
        );

        isValid = false;
    }


    // ============================
    // PHONE VALIDATION
    // ============================

    const phone = phoneInput.value.trim();

    const phonePattern = /^[0-9]{10}$/;

    if (phone === "") {

        showError(
            "phoneError",
            "Please enter your phone number."
        );

        isValid = false;

    } else if (!phonePattern.test(phone)) {

        showError(
            "phoneError",
            "Phone number must contain exactly 10 digits."
        );

        isValid = false;
    }


    // ============================
    // PASSWORD VALIDATION
    // ============================

    const password = passwordInput.value;

    if (password === "") {

        showError(
            "passwordError",
            "Please create a password."
        );

        isValid = false;

    } else if (password.length < 6) {

        showError(
            "passwordError",
            "Password must contain at least 6 characters."
        );

        isValid = false;
    }


    // ============================
    // DOB VALIDATION
    // ============================

    const dob = dobInput.value;

    if (dob === "") {

        showError(
            "dobError",
            "Please select your date of birth."
        );

        isValid = false;
    }


    // ============================
    // INTERVIEW TIME
    // ============================

    const interviewTime =
        interviewTimeInput.value;

    if (interviewTime === "") {

        showError(
            "timeError",
            "Please select your preferred interview time."
        );

        isValid = false;
    }


    // ============================
    // GENDER VALIDATION
    // ============================

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    if (!gender) {

        showError(
            "genderError",
            "Please select your gender."
        );

        isValid = false;
    }


    // ============================
    // JOB ROLE
    // ============================

    const role = roleInput.value;

    if (role === "") {

        showError(
            "roleError",
            "Please select a job role."
        );

        isValid = false;
    }


    // ============================
    // EXPERIENCE
    // ============================

    const experience =
        experienceInput.value;

    if (experience === "") {

        showError(
            "experienceError",
            "Please enter your experience."
        );

        isValid = false;

    } else if (
        experience < 0 ||
        experience > 40
    ) {

        showError(
            "experienceError",
            "Experience must be between 0 and 40 years."
        );

        isValid = false;
    }


    // ============================
    // SKILLS
    // ============================

    const selectedSkills =
        document.querySelectorAll(
            'input[name="skills"]:checked'
        );

    if (selectedSkills.length === 0) {

        showError(
            "skillsError",
            "Please select at least one skill."
        );

        isValid = false;
    }


    // ============================
    // COVER LETTER
    // ============================

    const coverLetter =
        coverLetterInput.value.trim();

    if (coverLetter === "") {

        showError(
            "coverLetterError",
            "Please write a short cover letter."
        );

        isValid = false;

    } else if (coverLetter.length < 20) {

        showError(
            "coverLetterError",
            "Cover letter must contain at least 20 characters."
        );

        isValid = false;
    }


    // ============================
    // PROFILE PHOTO
    // ============================

    if (profilePhotoInput.files.length === 0) {

        showError(
            "photoError",
            "Please select a profile photo."
        );

        isValid = false;
    }


    // ============================
    // RESUME
    // ============================

    if (resumeInput.files.length === 0) {

        showError(
            "resumeError",
            "Please select your resume."
        );

        isValid = false;
    }


    // ============================
    // TERMS
    // ============================

    if (!termsInput.checked) {

        showError(
            "termsError",
            "You must agree to the terms and conditions."
        );

        isValid = false;
    }


    // ============================
    // STOP IF FORM IS INVALID
    // ============================

    if (!isValid) {
        return;
    }


    // ============================
    // GET PROFILE PHOTO
    // ============================

    const photoFile =
        profilePhotoInput.files[0];

    const photoURL =
        URL.createObjectURL(photoFile);


    // ============================
    // GET RESUME
    // ============================

    const resumeFile =
        resumeInput.files[0];

    const resumeURL =
        URL.createObjectURL(resumeFile);


    // ============================
    // GET SKILLS
    // ============================

    const skills = [];

    selectedSkills.forEach(function (skill) {

        skills.push(skill.value);

    });


    // ============================
    // GET GENDER
    // ============================

    const selectedGender = gender.value;


    // ============================
    // CREATE APPLICATION CARD
    // ============================

    const card =
        document.createElement("div");

    card.className = "application-card";


    card.innerHTML = `

        <img 
            src="${photoURL}" 
            alt="Profile Photo"
            class="profile-photo"
        >

        <h3>${name}</h3>

        <p>
            <strong>Email:</strong>
            ${email}
        </p>

        <p>
            <strong>Phone:</strong>
            ${phone}
        </p>

        <p>
            <strong>Date of Birth:</strong>
            ${dob}
        </p>

        <p>
            <strong>Interview Time:</strong>
            ${interviewTime}
        </p>

        <p>
            <strong>Gender:</strong>
            ${selectedGender}
        </p>

        <p>
            <strong>Job Role:</strong>
            ${role}
        </p>

        <p>
            <strong>Experience:</strong>
            ${experience} years
        </p>

        <p>
            <strong>Skills:</strong>
        </p>

        <div class="skills">

            ${skills.map(function (skill) {

                return `<span class="skill">${skill}</span>`;

            }).join("")}

        </div>

        <p>
            <strong>Cover Letter:</strong>
            ${coverLetter}
        </p>

        <p>
            <strong>Resume:</strong>
            <a 
                href="${resumeURL}" 
                target="_blank"
            >
                ${resumeFile.name}
            </a>
        </p>

        <button 
            class="delete-button"
            type="button"
        >
            Delete Application
        </button>

    `;


    // ================================
    // ADD CARD TO PAGE
    // ================================

    applicationContainer.appendChild(card);


    // ================================
    // DELETE APPLICATION
    // ================================

    const deleteButton =
        card.querySelector(".delete-button");

    deleteButton.addEventListener(
        "click",
        function () {

            card.remove();

        }
    );


    // ================================
    // RESET FORM
    // ================================

    form.reset();

    photoName.textContent =
        "No photo selected";

    resumeName.textContent =
        "No resume selected";


    // ================================
    // SUCCESS MESSAGE
    // ================================

    alert("Application submitted successfully!");

});