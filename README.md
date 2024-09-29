# Psychologists-Services-App

## Project Description

Description: This project provides users with the ability to conveniently select
a psychologist from the list, view their profiles, add to favorites and sign up
for a consultation. The platform offers the following key features: Search and
sort: users can view the list of psychologists and sort them by rating, price
for a consultation and other parameters. Detailed profiles of psychologists:
each psychologist has their own page with detailed information, including a
description of experience, specialization, customer reviews and license. Add to
favorites: users can save interesting specialists to favorites to return to them
later. Schedule a consultation: the ability to choose a suitable psychologist
and sign up for an appointment through an online form.

## Features

- **Psychologist overview:** Large collection of psychologists who have
  different specifications, experience and ratings.

- **Favorite list:** You can add and remove psychologists from the favorite
  list.
- **Sorting:** Users can sort psychologists by various criteria.
- **Psychologist details:** Detailed information about each psychologist,
  including images, descriptions, characteristics and reviews.
- **Appointment process:** Smooth process with the ability to choose a time for
  an appointment. To book, simply fill out the form.

## Technologies and Dependencies

- React
- Firebase Realtime Database - for user authorization and collection robots
- React Router - for routing
- React Hook Form and Yup - for working with forms and validation
- Local Storage - for saving selected psychologists

## Project Structure

- **`src/pages`:** Three main pages of the application.

  - **`/`** - "Home" page with the title of the site, the company's slogan and a
    link that invites you to start working with the application and redirects to
    the "Psychologists" page.
  - **`/psychologists`** - "Psychologists" page contains a list of psychologists
    that the user can sort alphabetically - by ascending (from A to Z) or
    descending (from Z to A), by price - from the lowest price or from the
    highest, by popularity - from the lowest rating or from the highest.
  - **`/favorites`** - private page "Favorites" with psychologists who were
    added by the user to "favorites"private page "Favorites" with psychologists
    who were added by the user to "favorites"

- **`src/components`:** React components used throughout the application.

## Installing and running the project

Installing dependencies Go to the project directory and install the required
dependencies: npm install

Running the project in development mode To run the project locally, use the
command: npm start

Building the project for production To build an optimized version of the project
for production, run: npm run build

## MockAPI

Server used: [MockAPI](https://662676df052332d55322f58b.mockapi.io/campers)

## Author

**Serhii Savchenko**  
GitHub: [serg444s](https://github.com/serg444s)
