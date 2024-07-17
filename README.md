# Capital Quest

Capital Quest is a React-based quiz game where players have to pick the correct capital city for a given country.

The frontend of Capital Quest interacts with a backend API (which is secured via an auth-key) to fetch data about countries and their capitals. 

Here’s how it works:

Upon loading, the app fetches a set of countries and their capitals from the authenticated backend.
It presents a quiz where users must select the correct capital city of a given country from a set of options.
The user interface dynamically updates based on user selections, highlighting correct and incorrect answers.
At any time, users can reset the game to start a new quiz with a fresh set of countries and capitals.

Notes:
Error handling is implemented to manage failed API requests or unexpected responses.
The application uses CSS Modules for scoped styling, ensuring styles do not clash across components.

!!I would never usually push the .env file to github but in this case its purely an experimental project!! 

Installation:

Clone the repository:
git clone https://github.com/yourusername/capital-quest.git
cd capital-quest

Install dependencies:
npm install

Run application
npm run dev


