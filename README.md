# World Bank Indicator App

This app shows World Bank indicator data for selected indicators in the most populous countries: USA, Mexico, India, Nigeria and China

[DEMO](https://indicators-web.netlify.com/) 

## Features
- columns can be sorted by clicking on the header
- cells can be selected by clicking on it. Then, a simple form is shown to update the cell value.
- the indicator can be selected by a dropdown menu.

## Getting Started

Clone the repository:
```bash
git clone git@github.com:mdauner/indicators-web.git
```

Install dependencies:
```bash
yarn install
```

Set the API Url:
```bash
export REACT_APP_API_BASE_URL=https://indicators-api.herokuapp.com/api/v1/
```

Run the app:
```bash
yarn start
```

Then go to http://localhost:3000

## Running the tests

```bash
yarn run test
```

## Built with
- React
- React Table
- Tailwind CSS
- Axios
- TypeScript
- React Testing Library
