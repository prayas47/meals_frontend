Folder Structure MVCvANGULAR13
## Shared 
    -guard : containing auth gaurd for preventing unauthrized access
    -header : application header module
    -security :  contains crypto code for encryption and decryption
    -services : all services with dependency injection and http API calls

## environment
    -all env variables for data connection on component and services
    
## assets
    -currently not in use

## app
    --Auth 
      -Login - all code for login module
      -signup - all code for sign up process

    --Dashboard
      -default dashboard with header and meals module
  
  --App module 
    -routing with lazy moded 
    -handle all dependency in providers on root
    -html contains http loader with api calls
    -entry point for render html process
