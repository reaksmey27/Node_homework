export class BaseController {
    success (res, statusCode, message, data = null) {
        return res.status(statusCode).json({
            success: true,
            message: message,
            data: data,
        })
    }
    error (res, statusCode, message) {
        return res.status(statusCode).json({
            success: false,
            message: message,
        })
    }
}