import { destroyCookie, parseCookies, setCookie } from 'nookies'

export default class AuthWebSocket extends WebSocket {

    constructor(url: string, protocols?: string | string[]) {
		const nookies = parseCookies()
        const modifiedUrl = url.includes('?') ? `${url}&token=${nookies.access}` : `${url}?token=${nookies.access}`;        
        super(modifiedUrl, protocols);
    }

}
