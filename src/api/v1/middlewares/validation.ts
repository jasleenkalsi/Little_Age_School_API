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

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };