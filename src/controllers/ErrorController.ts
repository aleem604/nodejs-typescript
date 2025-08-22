import { Request, Response, NextFunction } from "express";

export const get404Page = (req:Request, res: Response, next: NextFunction) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
    });
};