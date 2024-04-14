// Load data from JSON files
const aboutMeData = /* Load data from about_me.json */;
const nicknamesData = /* Load data from nicknames.json */;
const pronounsData = /* Load data from pronouns.json */;
const usernamesData = /* Load data from usernames.json */;
const imageFiles = /* Load image file names from images folder */;

// Get DOM elements
const profileImage = document.getElementById('profile-image');
const username = document.getElementById('username');
const aboutMe = document.getElementById('about-me');
const nickname = document.getElementById('nickname');
const pronouns = document.getElementById('pronouns');
const generateBtn = document.getElementById('generate-btn');

// Function to generate a random profile
function generateProfile() {
  const randomAboutMe = aboutMeData[Math.floor(Math.random() * aboutMeData.length)];
  const randomNickname = nicknamesData[Math.floor(Math.random() * nicknamesData.length)];
  const randomPronouns = pronounsData[Math.floor(Math.random() * pronounsData.length)];
  const randomUsername = usernamesData[Math.floor(Math.random() * usernamesData.length)];
  const randomImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];

  profileImage.src = `data/images/${randomImageFile}`;
  username.textContent = randomUsername;
  aboutMe.textContent = randomAboutMe;
  nickname.textContent = randomNickname;
  pronouns.textContent = randomPronouns;
}

// Add event listener to generate button
generateBtn.addEventListener('click', generateProfile);