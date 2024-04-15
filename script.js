// Get DOM elements
const profileImage = document.getElementById('profile-image');
const username = document.getElementById('username');
const aboutMe = document.getElementById('about-me');
const nickname = document.getElementById('nickname');
const pronouns = document.getElementById('pronouns');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

// Load data from JSON files
let aboutMeData, nicknamesData, pronounsData, usernamesData, imageFiles;

// Variables to keep track of generated and downloaded profiles
let generatedProfilesCount = 0;
let downloadedProfilesCount = 0;

Promise.all([
        fetch('data/about_me.json').then(response => response.json()),
        fetch('data/nicknames.json').then(response => response.json()),
        fetch('data/pronouns.json').then(response => response.json()),
        fetch('data/usernames.json').then(response => response.json()),
        fetch('data/images.json').then(response => response.json())
    ])
    .then(([about, nicknames, pronouns, usernames, images]) => {
        aboutMeData = about;
        nicknamesData = nicknames;
        pronounsData = pronouns;
        usernamesData = usernames;
        imageFiles = images;
    })
    .catch(error => console.error('Error loading data:', error));

// Function to generate a random profile
function generateProfile() {
    if (!aboutMeData || !nicknamesData || !pronounsData || !usernamesData || !imageFiles) {
        console.error('Data not loaded yet');
        return;
    }

    const randomUsername = usernamesData[Math.floor(Math.random() * usernamesData.length)];
    const randomNickname = nicknamesData[Math.floor(Math.random() * nicknamesData.length)];
    const randomPronouns = pronounsData[Math.floor(Math.random() * pronounsData.length)];
    const randomImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    // Select a random property from the aboutMeData object
    const aboutMeProperties = Object.keys(aboutMeData);
    const randomProperty = aboutMeProperties[Math.floor(Math.random() * aboutMeProperties.length)];
    const randomAboutMe = aboutMeData[randomProperty][Math.floor(Math.random() * aboutMeData[randomProperty].length)];

    // Generate random primary and accent colors
    const randomPrimaryColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // Generate hex color code
    const randomAccentColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // Generate hex color code

    // Update DOM elements
    profileImage.src = `data/images/${randomImageFile}`;
    username.textContent = randomUsername;
    aboutMe.textContent = randomAboutMe;
    nickname.textContent = randomNickname;
    pronouns.textContent = randomPronouns;

    // Update primary and accent color boxes and their respective hex codes
    document.getElementById('primary-color-box').style.backgroundColor = randomPrimaryColor;
    document.getElementById('primary-color-text').textContent = randomPrimaryColor;

    document.getElementById('accent-color-box').style.backgroundColor = randomAccentColor;
    document.getElementById('accent-color-text').textContent = randomAccentColor;

    // Enable download button
    downloadBtn.disabled = false;

    // Increment the generated profiles count
    generatedProfilesCount++;
    localStorage.setItem('generatedProfiles', generatedProfilesCount);
    updateProfileCounts();
}

function downloadProfile() {
    // Create a new ZIP archive
    const zip = new JSZip();

    // Add profile picture to the archive
    const profileImageUrl = profileImage.src;
    const profileImageFileName = profileImageUrl.substring(profileImageUrl.lastIndexOf('/') + 1);

    // Fetch the profile image as a blob
    fetch(profileImageUrl)
        .then(response => response.blob())
        .then(blob => {
            // Add the profile image to the ZIP archive
            zip.file(profileImageFileName, blob);

            // Create a details.txt file with profile information
            const profileDetails = "Username: " + username.textContent + "\n" +
                "Nickname: " + nickname.textContent + "\n" +
                "Pronouns: " + pronouns.textContent + "\n" +
                "About Me: " + aboutMe.textContent + "\n" +
                "Primary Color: " + document.getElementById('primary-color-text').textContent + "\n" +
                "Accent Color: " + document.getElementById('accent-color-text').textContent;
            zip.file('details.txt', profileDetails);

            // Generate the ZIP file
            zip.generateAsync({
                    type: "blob"
                })
                .then(zipBlob => {
                    // Trigger download
                    saveAs(zipBlob, "profile.zip");
                })
                .catch(error => console.error('Error generating ZIP archive:', error));
        })
        .catch(error => console.error('Error downloading profile picture:', error));

    // Increment the downloaded profiles count
    downloadedProfilesCount++;
    localStorage.setItem('downloadedProfiles', downloadedProfilesCount);
    updateProfileCounts();
}

// Add event listener to generate button
generateBtn.addEventListener('click', generateProfile);

// Add event listener to download button
downloadBtn.addEventListener('click', downloadProfile);

// Function to update the profile counts
function updateProfileCounts() {
    document.getElementById('generated-count').textContent = generatedProfilesCount;
    document.getElementById('downloaded-count').textContent = downloadedProfilesCount;
}

// Function to initialize the counts from localStorage
function initializeCounts() {
    generatedProfilesCount = localStorage.getItem('generatedProfiles') || 0;
    downloadedProfilesCount = localStorage.getItem('downloadedProfiles') || 0;
    updateProfileCounts();
}

// Call initializeCounts when the page loads
window.addEventListener('load', initializeCounts);