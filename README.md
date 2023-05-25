# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). React + React Router + ReCharts + React Bootstrap

### `git clone https://github.com/CausticCheetos/sds-fridge-demo.git`

## Backend server
Ensure the following dependencies are installed

* djongo
* django
* djangorestframework 

To run server, change directory to `Backend\SDSFridge` and run
### `manage.py runserver`

## Frontend development server

Within project directory install packages by running:
### `npm install`

To begin development server run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Pushing changes

Ensure that you are on the lastest commit of current branch:

### `git fetch -a`

If your branch is behind, you can update branch:

### `git pull`

Create new branch either via GitHub repository or with:

### `git checkout -b newbranch`

If branch does not currently exist on repository run:

### `git push --set-upstream origin newbranch`

When new changes are made, add all changes with:

### `git add .A`

Or add them individually with:

### `git add filename`

Commit changes with:

### `git commit -m "message here"`

Push changes with:

### `git push`

Once development is finished on the new branch, create a pull request to merge with develop.

# To Do:

- [ ] Update Dashboard
- [ ] Bluefors interface
- [ ] Styling improvements
- [ ] Implement testing
- [ ] Refactor code
- [ ] Install axios for communication with backend

