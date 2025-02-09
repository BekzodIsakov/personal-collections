# Personal collections app

📦 Collections App
A web application that allows users to create, manage, and explore collections of various items. Users can register, interact with collections, and customize items with additional details. The app also includes an admin system for managing users and ensuring smooth moderation.

🚀 Features
User Roles
Unauthenticated Users: Can browse collections but cannot interact (like, comment, or create collections).
Authenticated Users: Can create, update, and delete their own collections and items.
Admin Users: Can authorize other users, enable/disable admins, and block/unblock users.
Collections & Items
Each collection includes:
Name
Author
Description
Image
List of items
Each item includes:
Name
Type
Tags
Optional fields with custom values
Interactions
Users can like and comment on collections and items (registration required for commenting).
Admins can edit and moderate collections.
Responsive Design
The app adapts to different viewport sizes for a seamless user experience across devices.
🎯 Purpose
This project was built to:
✅ Showcase my skills in web development
✅ Experiment with new technologies and features
✅ Serve as a portfolio piece for potential employers

⚙️ Tech Stack
(Include the technologies used, e.g., Next.js, TypeScript, MongoDB, etc.)

🛠️ Installation & Setup
(Provide setup instructions if needed, e.g., how to run the app locally.)

-------

Collection app that lets create, update and delete collections of different
items. There're 3 types of users. Anauthenticated users can only view
collections. Authenticated users can control their collection while admin users
can authorize other users, such as enabling/disabling other admins and
blocking/unblocking users. The app also responds to different viewport sizes.

Each collection has a name, author, description and items. Each items has a
name, type and tags. Optional fields and values can be added to each item.

About This Project
This is a collections app where users can register and create collections of their favorite items, such as coins, shoes, books, or anything else they collect. Each collection includes a name, an image, a list of items, and various other details to make it more informative.

Users can interact by liking and commenting on collections and individual items. However, commenting requires registration—guests can only browse collections. Each user has full control over their own collections, allowing them to manage and update them as needed.

The app also features an admin system. Admins can be assigned or blocked by other admins and have the ability to view and edit user collections to maintain order and moderation.

Purpose
I built this project to showcase my skills, experiment with new technologies, and explore different features I’ve been learning. It serves as both a learning experience and a portfolio piece to demonstrate my abilities to potential employers.

[App link](https://personal-collections-app.netlify.app/ "Netlify")

[Video demo](https://youtube.com "YouTube") - link is temporarily broken

![App screenshot](/app-screenshots/Screenshot%202023-10-11%20at%2019.50.41.png "Main page")
![App screenshot](/app-screenshots/Screenshot%202023-10-11%20at%2019.51.15.png "Collection page")
![App screenshot](/app-screenshots/Screenshot%202023-10-11%20at%2020.00.28.png "Items comments")

## Technologies used

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Frontend is hosted by [Netlify](https://www.netlify.com/) and backend is
deployed on [Render](https://www.render.com)

## Run project locally

### In the `/client` directory:

#### `npm run dev`:

Runs the frontend in the development mode. Open
[http://localhost:5173](http://localhost:5173) to view it in your browser

#### `npm run build`:

Builds the app for production to the build folder. It correctly bundles React in
production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to
be deployed!

### In the `/app` directory:

#### Create .env file and add the following keys:

```js
ATLAS_CONNECTION_PASSWORD=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=
S3_REGION=
```

#### `npm run dev`:

Runs the backend in the development mode.
