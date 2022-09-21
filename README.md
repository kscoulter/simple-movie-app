# Movies

## Local Setup
### JS App
1. Run `npm install`
2. Run `npm run start`
3. Visit `localhost:3000`. Notice the routes set up in `App.js`. These routes must be retained as the app is developed.

### Python API
1. Navigate to the `transformApp` directory: `cd transformApp`
2. Install the necessary python packages: `pip3 install -r requirements.txt`
3. Start up the API: `python3 api.py`

## Routes
There are 2 main routes to the JS app:
1. Root `/`: This should display a list of movies available
2. Movie detail `/movie/${id}`: This displays details of the movie that matches `id`

## Folders

1. `src` - Contains the react app and all its components
3. `transformApp` - Contains the python API
