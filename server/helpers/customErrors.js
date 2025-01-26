const HTTP_STATUS = require("./statusCodes");

// module.exports = (message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   throw error;
// };

class BAD_REQUEST_ERROR extends Error{
  constructor(message){
    super(message)
    this.name = `Bad Request Error`
    this.statusCode = HTTP_STATUS.BAD_REQUEST
  }
}

class UNAUTHORIZED_ERROR extends Error{
  constructor(message){
    super(message)
    this.name = `Unauthorized Error`
    this.statusCode = HTTP_STATUS.UNAUTHORIZED
  }
}

class FORBIDDEN_ERROR extends Error{
  constructor(message){
    super(message)
    this.name = `Forbidden Error`
    this.statusCode = HTTP_STATUS.FORBIDDEN
  }
}

class NOT_FOUND_ERROR extends Error{
  constructor(message){
    super(message)
    this.name = `Not found error`
    this.statusCode = HTTP_STATUS.NOT_FOUND
  }
}

module.exports = {
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR
}