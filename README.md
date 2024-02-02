# Memory Lane Social Media App
Welcome to Memory Lane, a social media app designed to help you relive and share your cherished memories. This app was developed as a part of the BILD-IT web development bootcamp, utilizing Node.js/Express.js for the backend, MySQL for the database, and EJS for templating.

## Features
    1. Authentication System

     Secure login and registration validation,
     Logout functionality to ensure user privacy and security
    
    2. Timeline Management

     Create and manage timelines, each representing a specific period or theme in your
     life (e.g., childhood, vacations, etc.),
     Perform CRUD operations on timelines for easy organization,
     Memory Creation,
     Create individual memories within timelines, allowing you to document and
     share specific moments,
     Customize each memory with details and attachments

    3. Profile Customization

     Edit profile data, including personal information and profile picture,
     Customize timeline style by changing the background color and font
     
    4. User Interaction
    
     Explore the Home Page feed to see memories from other people,
     Search for other users to view their timelines and memories

## Dependencies
- bcrypt
- body-parser
- cookie-parser
- dotenv
- ejs
- express
- express-validator
- jsonwebtoken
- multer
- mysql2

## Run Locally

Clone the project:

```bash
  git clone https://github.com/MujoBabajic/memory-lane.git
```

Open the project inside your text editor and install dependencies with this code:

```bash
  npm install
```

Change the directory to backend folder and start the server:

```bash
  npm run devStart
```

Visit http://localhost:3000 in your web browser.
