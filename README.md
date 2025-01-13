# Chatty

## Summary

The goal was to develop a full-stack MERN application inspired by the functionality of Discord. The project incorporated a variety of advanced technologies, including the integration of Amazon Web Services (AWS) to enhance specific features.

## Technologies

- Typescript
- React
- Vite
- TailwindCSS
- Redux Toolkit
- RTK Query
- Node Express
- MongoDB
- Mongoose (ODM)
- AWS S3
- AWS IAM
- AWS SDK
- Socket.io
- JsonWebTokens
- SuperTest
- Vitest

![Login](https://github.com/user-attachments/assets/e6cb155e-6a33-470d-a48a-2834f022bb1e)
![create-server](https://github.com/user-attachments/assets/b38727b6-48f6-406f-be0a-466ef97693d6)
![server](https://github.com/user-attachments/assets/b7838d11-fd5a-4ab4-a707-87d190d0530c)

## Features

- Login and Registration
- Search for users and request to chat
- Accept or decline chat requests
- Live updated messaging between users
- Create, update and join different servers
- Online and offline user functionality in servers
- Create different text channels in servers
- Add profile picture or server picture

## Functionality

- Developed with a `React` `TypeScript` front-end using `Vite` for efficient project building, `TailwindCSS` for clean and responsive UI design, `Redux Toolkit` for centralized state management, and `RTK Query` for seamless API integration with the back-end server.
- Integrated `MongoDB` with `Mongoose(ODM)` in an `Express` `TypeScript` server, managing persistent storage for user-created servers, previously communicated messages, and `S3` image names for profile picture accessibility.
- Incorporated `Socket.io` for real-time user updates, including online/offline status for friends and servers, and live updated message communication.
- Integrated `AWS` `S3` using the `AWS SDK` and `IAM`,establishing programmatic access for connecting to the bucket.
- Implemented storage for user images and enabled temporary access through signed URLs to the images.
- Incorporated `Vitest` Testing framework for catching any bugs that may slow down or disrupt development
