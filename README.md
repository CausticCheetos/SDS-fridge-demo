# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). React + React Router + ReCharts + React Bootstrap

In directory where you want to begin development run:

### `git clone https://github.com/CausticCheetos/sds-fridge-demo.git`

Within project directory install packages by running:

### `npm install`

To begin development server run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Pushing changes

Switch to develop branch before creating new branch:

### `git checkout develop`

Ensure that you are on the lastest commit of current branch:

### `git fetch -a`

If your current branch is behind, you can update branch:

### `git pull`

Create new branch either via GitHub repository or with:

### `git checkout -b newbranch`

If branch does not currently exist on repository run:

### `git push --set-upstream origin newbranch`

When new changes are made add all changes with:

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

