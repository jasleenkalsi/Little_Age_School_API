import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

// Validation Middleware
export const validate = (schema: ObjectSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(400).json({
                success: false,  // 🔥 Ensure success field exists
                message: "Validation failed",
                errors: error.details.map((err) => err.message),
            });
            return; // Ensures request handling stops here
        }

        next(); // Pass to the next middleware/controller
    };
};
