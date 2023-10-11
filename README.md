# Personal collections app

Collection app that lets create, update and delete collections of different
items. There're 3 types of users. Anauthenticated users can only view
collections. Authenticated users can control their collection while admin users
can authorize other users, such as enabling/disabling other admins and
blocking/unblocking users.

Each collection has a name, author, description and items. Each items has a
name, type and tags. Optional fields and values can be added to each item.

[App link](https://personal-collections-app.netlify.app/ "Netlify")

[Video demo](https://youtube "YouTube")

![App screenshot](/app-screenshots/Screenshot%202023-10-11%20at%2019.50.41.png "Main page")
![App screenshot](/app-screenshots/Screenshot%202023-10-11%20at%2019.51.15.png "Collection page")
![App screenshot](/app-screenshots/Screenshot%202023-10-11%20at%2019.57.51.png "Collection page")

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
