declare module 'js-cookie' {
    interface CookieAttributes {
        path?: string;
        domain?: string;
        expires?: number | Date;
        secure?: boolean;
        sameSite?: 'strict' | 'lax' | 'none';
        [property: string]: any;
    }

    interface JsCookie {
        get(name: string): string | undefined;
        get(): { [key: string]: string };
        set(name: string, value: string, options?: CookieAttributes): void;
        set(name: string, value: any, options?: CookieAttributes): void;
        remove(name: string, options?: CookieAttributes): void;
    }

    const Cookies: JsCookie;
    export default Cookies;
}
