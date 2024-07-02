import { Request, Response } from "express";

export default class ActionController {
    async getAction(req: Request, res: Response) {
        try {


        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error: ${error.message}`
                })
        }
    }

    async postAction(req: Request, res: Response) {
        try {


        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error: ${error.message}`
                })
        }
    }
}