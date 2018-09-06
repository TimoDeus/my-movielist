Simple React/Redux application to display and filter a list of movies based on data from Open Movie Database (OMDb).

## Getting started
1. `yarn install`
1. `yarn start`
1. That's it.

## Populate data

1. set a valid OMDb api key in file `.env`
1. adjust `/src/data/input.json` with relevant IMDb IDs
1. run `yarn load-data`, data is written into `/src/data/output.json`

## Future To Dos

* Externalize hardcoded german messages and configuration values
* Move from filebased data to a real database system
* "Already seen" feature
* "Wishlist" feature

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
