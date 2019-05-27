import axios from 'axios';

export const getToken = async () => axios.get('/stream/socketio');

