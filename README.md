# GlassUI
## Alternative front end for Home Assistant, powered by Home Assistant REST API, and Home Assistant Websockets API

### Clone
To install, simply clone this repo to a system that is running node 14 with npm installed
```
   git clone https://github.com/thefreymaster/glass-ui
```

Then you'll need to tell GlassUI where home assistant is running.
Create a file called `.env` in the root of your project.  Fill in the two keys below (also see .envExample file for key names)

| First Header  | Second Header |
| ------------- | ------------- |
| VITE_HOMEASSISTANT_TOKEN  | Longlived home assistant token, obtained from profile in home assistant   |
| VITE_HOMEASSISTANT_IP  | IP address of your home assistant instance with port (example 192.168.1.2:8123)  |

### Installation & Running

See for long lived access token https://community.home-assistant.io/t/how-to-get-long-lived-access-token/162159 
Then
```
   cd /glass-ui
   npm run prod
```

`npm run prod` will run the install, build, and preview commands.  You can view GlassUI now on your network on the IP:PORT that is listed



