
# To Run the application.
============================
1. Goto root folder of application /todo-list in terminal
2. run - npm run both.

This cmd will start both backend as well as frontend. Backend at port 5000 and Frontend at port 3000.

Sign up using email and create credentials.
Now one can add there todos and modify, delete them.
Logout once done.


========================================================
#Backend API Endpoints.
--------------------
-Authentication:
----------------
1. Method - POST

   Url - http://localhost:5000/api/auth/createuser
   
   Headers - content-type : application/json

   body - {
      "name": "Ritik",
      "email": "rit@gmail.com",
      "password": "Ritik"
    }

3. Method - POST
 
   url - http://localhost:5000/api/auth/login

   headers - content-type : application/json

   body - {
      "email": "rit@gmail.com",
      "password": "Ritik"
    }

5. Method - GET
   
   url - http://localhost:5000/api/auth/getuser
   
   headers -
   auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88
   
 - Todos:
 --------
  1. Method - POST

     url - http://localhost:5000/api/todos/savetodos

     body - {
        "task" : "My note 6",
        "description" : "Wake up late in morning 6",
        "status" : "penging"
      }

     headers-

      Content-Type: application/json

      auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88

  3. Method - GET

     url - http://localhost:5000/api/todos/fetchalltodos

     headers -

     auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88
     
  5. Method - PUT

     url - http://localhost:5000/api/todos/updatetodo/65a2e2e431da87433cb98570

     body - {
        "task" : "My note  asd  ad2 updated",
        "description" : "WaZcke up sadf late in morning 1 updated",
        "status" : "done"
      }

     headers -

      Content-Type: application/json

     auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88


  7. Method - DELETE

     url - http://localhost:5000/api/todos/deletetodo/65a2e2e431da87433cb98570

     headers -

     Content-Type: application/json

     auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88
