
# Introduction

* **My Diary** is an online journal where users can pen down their thoughts and feelings.  

# Features

* Users can create an account and log in. 
* Users can view all entries to their diary. 
* Users can view the contents of a diary entry. 
* Users can add or modify an entry. 
  
# API Endpoints

|  Endpoints | Description  | Public Access |
| --- | :--- | ---: |
| POST  `/api/v1/auth/signup`  | Sign up.| TRUE
| POST  `/api/v1/auth/login`  | Log in.| TRUE
| POST  `/api/v1/entries/`  | Add a diary entry.| FALSE
| GET  `/api/v1/entries/`   | gets all diary entries.| FALSE
| GET  `/api/v1/entries/<entryId>`  | Get diary entry by id. | FALSE
| PUT  `/api/v1/entries/<entryId>`  | Update diary entry by id. | FALSE


# Documentation

- Visit https://mydiary8.docs.apiary.io/ for the documentation of the API

# Heroku

- The app is deployed at the following url - https://diary-api-v2.herokuapp.com/


