# Notification Library

## Installation

### Prerequisite

1. Node JS
2. Angular CLI

You can download the node js [here](https://nodejs.org/en/download/).
After node is installed run **npm install -g @angular/cli** command to get angular cli.

### Server

To install and start the server, run following commands:

1. cd backend
2. npm install
3. node index

### Angular

To install and start the frontend application, run following commands:

1. cd backend
2. npm install
3. ng serve

### MEAN Stack Application

1. MongoDB is used as database, hosted on GCP using MongoDB Atlas.
2. Express is used for backend.
3. Angular 12 is used for frontend.
4. NodeJS v14 as a runtime environment for javascript.

### User Authentication

Authentication is implemented for the user management
 - User can create account using **username** and **password**
 - Bcrypt library is used for password encryption
 - On signup, document with username and password is stored in database.
 - On login user is redirected to the dashboard
 - Users Available
     1. User 1
        - **username:** *mustafa*
        - **password:** *password*
     3. User 2
        - **username:** *urooj*
        - **password:** *password*
     5. User 3
        - **username:** *hanzalah*
        - **password:** *password*


### Requirements

Most of the requirements have been implemented.
 - Users can create a profile and login.
 - Notification is displayed as an overlay.
 - Notification has a header and body which user can define.
 - Notifications of category **info, warning** and **error** can be displayed.
 - Notifications are closable with the close button, and disappear after given timeout.

**Pending requirements**
 - Testing, only default usecases are present which were not tested.
 - Edit and delete notification routes are created but not integrated with buttons on frontend
 
 ### Database 
 
 Following schemas are used in the database
 
 1. **Users** -> stores username and encrypted password of users.
 2. **Notifications** -> stores userID, headerContent, bodyContent and category of notifications.
 
 ### Notification Library
 
 - Angular library is created for showing notifications
 - Library code is present at following path frontend/projects/notify-lib
 - Library code is also packed and published on npm
 - Here is the link for the library [ms-notify](https://www.npmjs.com/package/ms-notify)
 - To use the library, place **lin-notify** HTML tag in your component
 
### Notification Service

Following are the exposed methods by the service of this library, user can use these to display notification in their application
 - addNotification
 - clearNotification
 - clearAllNotification
 - changePosition
 - changeTimeout
 
 
