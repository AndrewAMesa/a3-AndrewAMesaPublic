
## Andrew Mesa's Web Application - Focusly

### Overview
This project is a task manager with add, delete, and update functionalities. The items are sorted by priority level
high at the top and low at the bottom. Furthermore, when adding items ensure you include all fields. You can
edit both the description and deadline of already created task managers.

#### Instructions for Use
1. Begin by registering an account and then logging in with that account.
2. Use the nav bar to go to the task entry form.
3. View the stored tasks on the home page.
4. Edit or delete existing data entries through buttons on the home page.


### Link to Deployment
Andrew Mesa: https://a3-andrewamesa.glitch.me/

---

## Technical Achievements

- **Built a Server with Express.js**
    - Set up an Express server to handle HTTP requests and serve dynamic data.
    - Implemented a real-time results page that always displays the latest dataset by fetching data from the server.
    - Enabled users to add, update, and delete entries through a form with instant updates.

- **Integrated MongoDB for Persistent Data Storage**
    - Used MongoDB to store data persistently, ensuring nothing is lost between server sessions.
    - Implemented full CRUD functionality so users can create, read, update, and delete only their data and not other's.

- **Built a Responsive Web App**
    - Designed the homepage to always reflect the server's latest state.
    - Used JavaScript to dynamically update content whenever data changes.

- **Implemented User Authentication with Local Storage**
    - Used the browser's localStorage to keep user login information across sessions.
    - Implemented a simple login mechanism where uses sign in with a username and password and credentials are stored locally.
    - Allowed user account creation upon starting the app (with clear alerts so users know about it).

## Design & Evaluation Achievements

- **Styled the App with TailwindUI**
    - Used TailwindUI for styling.
    - Maintained a consistent color scheme and used the [Nunito font](https://fonts.google.com/specimen/Nunito).
    - Enhanced user interaction by styling buttons, forms, and tables.

- **Built User-Friendly HTML Forms**
    - Used various HTML input elements (`<input>`, `<select>`, `<button>`) to handle different task details such as descriptions, priority levels, and deadlines.
    - Added form validation to ensure users enter all information.
    - Separated login/authentication from the main application, making it more intuitive.
    - Restricted data visibility so users can only see and edit their own information after logging in.

- **Optimized for Performance and Best Practices**
    - Tuned both front-end and back-end performance to score 90%+ on Google Lighthouse tests for Performance, Best Practices, Accessibility, and SEO.
    - Reduced unnecessary CSS and JavaScript for faster load times.
    - Applied SEO best practices with structured HTML and optimized metadata.


