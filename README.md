# Star Cab official website

![GitHub Logo](/images/startravel.bmp)


[Lets go to live preview](https://pdoubleu.github.io/)


Website presents local tourist company. Provides simple information (adress, services, etc.) and allows to contact with the company owners by form. The form data is send on the server, where the php script save it in the database and on the other had is mailing an alert message to the owner that someone wants to contact. It is available in two languages: polish and english.


## Used technologies and approaches

During conceptual works, I have been relying on the Mobile First approach and was inspired by designs with horizontal scroll. The task was hard, I tried many diffirent aproaches to the unusual way of showing the content, and ended up with manipulation in css. Because of that the project was hard to implement for older browsers: IE and Edge older than ver 44 are not supported. When the user is visitin the website on one of unsupported browser he gets the kind advise to use another browser.

I have used following technologies:

    1. HTML5
    2. Preprocessor SASS
    3. JavaScript
    4. PHP
    5. MySQL


## Used tools:

The followed tools were used to finalize project:

    1. Visual Studio Code
    2. GIT - as a control version system
    3. Webpack - to put all project's elements together into joined files ready to deploy
    4. Many popular plugins for Webpack to make production more efficient and easier
    5. GIMP and Inscape - to prepare pictures and desing some elements of the website.
    6. Filezilla to host the website and set up SSL and redirections.

## Security:

I used simple filtering for HTML's special characters so the user's inputs are always free of dangerous characters.

## Interesting facts about project:

This project was the first time when I tried to play with larger JSON files to store dynamically injected content. I found out that is much better for maintanance to keep kontent in one file and put it in the correct part of website using JavaScript XMLhttprequest or fetch API's. From the style point of view the hardest part was to set the style for horizontal scrolling. After many days of test I came across a solution in pure css.
