import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash'

const GQL_VC_ALARMS = `
query alarms($initial: String, $final: String, $page: String, $pageSize: String) {
  alarms(initial: $initial, final: $final, page: $page, pageSize: $pageSize) {
    ts
    alarmId
    alarmType
    score
    faceId
    image
    rectangle {
      top
      left
      bottom
      right
    }
  }
}
`;

const GQL_VC_ALARM_DETAIL = `
query alarmDetail($alarmId: String, $rectangle: rectangle, $faceId: String) {
  alarmDetail(alarmId: $alarmId, rectangle: $rectangle, faceId: $faceId) {
    faceImg
    frameImg
    country
    occupation
    gender
    description
    name
  }
}
`;

const getQuery = (initial, final, page, pageSize) => {
    const variables = {
        initial,
        final,
        page,
        pageSize,
    };
    return {
        query: GQL_VC_ALARMS,
        variables: JSON.stringify(variables),
    };
};

const getDetailQuery = (alarmId, rectangle, faceId) => {
    const variables = {
        alarmId,
        rectangle,
        faceId
    };
    return {
        query: GQL_VC_ALARM_DETAIL,
        variables: JSON.stringify(variables),
    };
};


export const getAlarmsHistoric = async (initial, final, page, pageSize) => {
    try {
        const req = getQuery(initial, final, page, pageSize);
        const response = await axios.post('/graphql?', req);
        const { data: { data: { alarms } } } = response;
        return _.orderBy(alarms, ['ts'], 'desc');
    } catch (error) {
        toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        throw new Error(error.message);
    }
};

export const getAlarmDetails = async (alarmId, rectangle, faceId) => {
    try {
        const req = getDetailQuery(alarmId, rectangle, faceId);
        const response = await axios.post('/graphql?', req);
        const { data: { data: { alarmDetail } } } = response;
        return alarmDetail;
    } catch (error) {
        toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        throw new Error(error.message);
    }
};


export const getDevices = (callback) => {
    axios.get('/device').then((response) => {
        const { status, data: { devices } } = response;
        if (status === 200) {
            const result = devices.map((device) => {
                return device.id;
            });

            callback(result);
            return 0;
        }
        return -1;
    }).catch(error => console.error(error))
};

export const getHistoric = (deviceId, callback) => {
    axios.get(`/history/device/${deviceId}/history?lastN=1&attr=image&attr=license_plate&attr=vehicle_type`).then((response) => {
        const { status, data } = response;
        if (status === 200) {
            callback(data);
            return 0;
        }
        return -1;
    }).catch(error => console.error(error))
};
