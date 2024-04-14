// Get DOM elements
const profileImage = document.getElementById('profile-image');
const username = document.getElementById('username');
const aboutMe = document.getElementById('about-me');
const nickname = document.getElementById('nickname');
const pronouns = document.getElementById('pronouns');
const generateBtn = document.getElementById('generate-btn');

// Load data from JSON files
let aboutMeData, nicknamesData, pronounsData, usernamesData, imageFiles;

Promise.all([
  fetch('data/about_me.json').then(response => response.json()),
  fetch('data/nicknames.json').then(response => response.json()),
  fetch('data/pronouns.json').then(response => response.json()),
  fetch('data/usernames.json').then(response => response.json()),
  fetch('data/images/')
    .then(response => response.text())
    .then(data => data.trim().split('\n').filter(Boolean))
])
.then(([about, nicknames, pronouns, usernames, images]) => {
  aboutMeData = about;
  nicknamesData = nicknames;
  pronounsData = pronouns;
  usernamesData = usernames;
  imageFiles = images.map(file => `data/images/${file}`);
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

  // Update DOM elements
  profileImage.src = randomImageFile;
  username.textContent = randomUsername;
  nickname.textContent = randomNickname;
  pronouns.textContent = randomPronouns;
  aboutMe.textContent = randomAboutMe;
}

// Add event listener to generate button
generateBtn.addEventListener('click', generateProfile);