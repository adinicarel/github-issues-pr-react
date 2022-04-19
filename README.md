** Project built with custom boilerplate on top of React library, using TailwindCSS for styling, and TypeScript.

** The project focus is on JS fetch function and TypeScript to connect to the GitHub api, directing to 4 different endpoints inside: users, repos, issues, comments 

** In order to view or test the application, follow the next steps:

*** open a terminal window
*** git clone https://adinicarel/github-issues-pr-react
*** enter the folder: cd github-issues-pr-react
*** run the npm install command to install all necessary dependency packages
*** run npm start to start viewing the app in the browser
*** type in the two inputs valid GitGub username and valid repository
*** this should display under the form a list of components representing all GitHub issues and pull requests belonging to the specified repository for the given user
*** on clicking each of the articles representing the issues/pr's a modal window should appear, triggering another http request for the clicked item, relating the issues with the comments, if any

** the main challenge was configuring correctly the fetch functions, considering the logic and conditions the application required

**room from improvement: styling, especially the tailwindCSS library where I'm still scratching the surface. (The modals are not behaving properly so I will rework them shortly.)
*And of course, the project should be better structured, mostly in extracting some logic from ui components, and improving its modularity and scalability.
