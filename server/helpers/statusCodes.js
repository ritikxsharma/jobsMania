module.exports = {
    //SUCCESS
    OK: 200, //Standard successful HTTP esponse
    CREATED: 201, //Resource successfully created

    //CLIENT_ERRORS
    BAD_REQUEST: 400, //The server could not understand the request
    UNAUTHORIZED: 401, //The client must authenticate to get the response
    FORBIDDEN: 403, //The client does not have access
    NOT_FOUND: 404, //The server could not the the requested resource
    
    //SERVER_ERRORS
    INTERNAL_SERVER_ERROR: 500, //The server has an issue and dont know how to handle

}