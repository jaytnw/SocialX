import './setup'

export const ACCESS_TOKEN_SECRET: string = String(process.env.ACCESS_TOKEN_SECRET);
export const REFRESH_TOKEN_SECRET: string = String(process.env.REFRESH_TOKEN_SECRET);

export const ACCESS_TOKEN_EXPIRES_IN: string = '15m';
export const REFRESH_TOKEN_EXPIRES_IN: string = '7d';
