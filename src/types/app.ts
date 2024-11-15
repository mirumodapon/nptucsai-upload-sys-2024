import Express from 'express';

export type Port = string | number;

export type Routes = { path: string | RegExp; router: Express.Router };

export type AppOptions = { routes: Routes[] };
