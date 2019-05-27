import io from 'socket.io-client';
import { getToken } from './SocketUtils'

const config = {
    "SERVER_URL": "http://10.233.48.38",
    "SERVER_SOCKET_URL": "http://10.233.48.38:8000",
    "SERVER_TOKEN_URL": "http://10.233.48.38/stream/socketio"
};

export const setConnection = async () => {
    const response = await getToken();
    const { data: { token } } = response;
    window.socket = io(config.SERVER_SOCKET_URL + '?token=' + token, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity,
        secure: true,
        rejectUnauthorized: false
    });
};

export const listenerDevice = (id, callback) => {
    window.socket.on(id, (msg) => {
        if (!!msg.attrs) {
            const { attrs, metadata: { deviceid, timestamp } } = msg;
            callback({ attrs, deviceid, timestamp })
        }
    })
};

export const errorListeners = (id, callback) => {

    window.socket.on('disconnect', (reason) => {
        console.error("Socket perdeu a conexão ", reason);
        disconnect();
        setTimeout(async () => {
            console.log('Criando uma nova conexão');
            await setConnection();
            listenerDevice(id, callback);
            errorListeners(id, callback);
        }, 5000)
    });
};

export const disconnect = () => {
    if (window.socket) {
        console.error("Fechando Socket");
        window.socket.close();
    } else console.info("Socket já está fechado");
};
