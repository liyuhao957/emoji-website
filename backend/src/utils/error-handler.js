class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // 开发环境返回详细错误信息
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // 生产环境只返回必要信息
        res.status(err.statusCode).json({
            status: err.status,
            message: err.isOperational ? err.message : '服务器内部错误'
        });
    }
};

module.exports = {
    AppError,
    errorHandler,
    // 异步错误处理包装器
    catchAsync: fn => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}; 