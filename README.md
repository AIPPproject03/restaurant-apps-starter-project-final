# Fried Rice King - Restaurant Catalogue

**Fried Rice King** is a web application that allows users to explore a variety of fried rice dishes from different restaurants. It features an interactive and user-friendly interface for browsing restaurants, viewing restaurant details, and managing favorite restaurants.

## Features

- **Restaurant Catalog**: Browse through a list of restaurants offering fried rice dishes.
- **Restaurant Details**: View detailed information about each restaurant, including its name, rating, and description.
- **Favorite Restaurants**: Save your favorite restaurants and access them easily from the favorite page.
- **Responsive Design**: The application is fully responsive, ensuring a smooth experience on mobile, tablet, and desktop devices.
- **Keyboard Navigation**: The app supports keyboard navigation, making it accessible to a wider audience.

## Tech Stack

- **Frontend**: 
  - HTML
  - CSS (Custom layout with CSS Grid and Flexbox)
  - JavaScript (Vanilla JS)
  - Webpack (for module bundling and development)
- **Testing**:
  - Jest (for unit and integration testing)
  - CodeceptJS (for end-to-end testing)
- **Version Control**: Git

## Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (Recommended version: LTS)
- **npm** (or Yarn)

### Steps to Install

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/fried-rice-king.git
   cd fried-rice-king
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:8080` to view the app.

## Usage

- **Home Page**: View a list of restaurants, their names, images, and ratings.
- **Restaurant Details**: Click on a restaurant to view its details, including a description and additional information.
- **Favorite Page**: You can save your favorite restaurants to revisit them later.

## Testing

To run the tests:

### Unit & Integration Tests

Run the following command to execute the tests:

```bash
npm test
```

### End-to-End Tests

Run the end-to-end tests with CodeceptJS:

```bash
npm run test:e2e
```

## Contributing

We welcome contributions! If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

Please ensure that your code adheres to the existing code style and includes tests if applicable.

## Acknowledgments

- Inspiration for the project comes from the growing interest in food catalogs and restaurant review platforms.
- Special thanks to the open-source community for providing useful libraries and tools.
