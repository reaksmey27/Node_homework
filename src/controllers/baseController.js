export class BaseController {
  success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  error(res, message, statusCode) {
    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
}
