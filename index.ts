/**
 * snarkOS.js
 * snarkOS JavaScript API
 */

export interface snarkOSOptions {
    port?: number;
    username?: string;
    password?: string;
}

/**
 * snarkOS client constructor
 */
export class snarkOS {
    public url: string;
    public port: number = 3030;
    username?: string;
    password?: string;

    constructor(url: string, options?: snarkOSOptions) {
        this.url = url;

        // Override default settings
        if (options?.port) {
            this.port = options.port;
        }
        if (options?.username) {
            this.username = options.username;
        }
        if (options?.password) {
            this.password = options.username;
        }
    }
}
