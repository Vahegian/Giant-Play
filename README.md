# Giant Play

Cast custom media to your tv with chromecast.

Create a json file like this:

    {
        "group_name_1": [
            {
                "title":"any_title",
                "link":"http://your_url"
            },
            ...

        ],

        "group_name_2":[
            ...
        ]

        ...
    }

save the file in your smartphone with '.json' extension

    eg. file.json

if you're opening the app the first time you will be asked to select a file, choose the file you created. You can always select another file later.

To install the app for testing:
*   clone this repo
*   cd to Giant-Play
*   run: npm i
*   run: react-native run-android,  (code was not tested on ios devices)
*   if you get "server not running" error, run "npm start" then run "react-native run-android"
*   if you see this error :

        error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup. Run CLI with --verbose flag for more details.
        Error: spawn ./gradlew EACCES

    run

        sudo chmod +x ./android/gradlew