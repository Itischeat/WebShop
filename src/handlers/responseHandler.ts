
class responseHandler {
    sendError(res: any, status: number, message: string) {
        return res.status(status).json({
            success: false,
            message: message
        })
    }
    sendData(res: any, status: number, data: any) {
        return res.status(status).json({
            success: true,
            data: data
        })
    }
}

module.exports = new responseHandler()