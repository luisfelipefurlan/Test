import React from "react";
import uuidv1 from 'uuid'
import _ from 'lodash'


export const WeatherCard = (props) => {

    const {
        wsMx,
        rhAvg,
        atAvg,
        perHour,
    } = props.values;

    let values = {
        atAvg: {value: '-- °C', title: 'Temperatura', id: uuidv1()},
        rhAvg: {value: '-- %', title: 'Umidade Relativa', id: uuidv1()},
        wsMx: {value: '-- km/h', title: 'Velocidade do Vento', id: uuidv1()},
        perHour: {value: '-- mm', title: 'Volume de Chuva', id: uuidv1()}
    };

    if (!!props.values) {
        values['atAvg'] = {
            value: (atAvg.length > 0 ? _.head(atAvg).value.toFixed(1) : '--') + ' °C',
            title: 'Temperatura',
            id: uuidv1(),
        };
        values['rhAvg'] = {
            value: (rhAvg.length ? _.head(rhAvg).value.toFixed(1) : '--') + ' %',
            title: 'Umidade Relativa',
            id: uuidv1(),
        };
        values['wsMx'] = {
            value: (wsMx.length ? _.head(wsMx).value.toFixed(1) * 3.6 : '--') + ' km/h',
            title: 'Velocidade do Vento',
            id: uuidv1(),
        };
        values['perHour'] = {
            value: (perHour.length ? _.last(perHour).partial.slice(0, 3) : '--') + ' mm',
            title: 'Volume de Chuva',
            id: uuidv1(),
        };
    }

    return (
        <div className={'weather-card'}>
            {Object.values(values).map((value, index) => (
                <CardValue value={value} key={value.id}/>
            ))}
        </div>
    )
};

export const CardValue = (props) => {
    return (
        <div className={'info-area'}>
            <div className={'middle-info'}>
                <div className={'info-value'}>
                    {props.value.value}
                </div>
                <div className={'info-desc'}>
                    {props.value.title}
                </div>
            </div>
        </div>
    )
};

export const DashboardCard = (props) => {

    const {device: {atAvg, rhAvg, wsMx, perHour}, name} = props;
    return (
        <div className={'station-card'}>
            <div className={'upper'}>

                <div className={'middle-info'}>
                    <div className={'info-value'}>
                        {`${atAvg.length ? _.head(atAvg).value.toFixed(1) : '--'}°C`}
                    </div>
                    <div className={'info-desc'}>
                        Temperatura
                    </div>
                </div>
                <div className={'middle-info'}>
                    <div className={'info-value'}>
                        {`${rhAvg.length ? _.head(rhAvg).value.toFixed(0) : '--'}%`}
                    </div>
                    <div className={'info-desc'}>
                        Umidade
                    </div>
                </div>
                <div className={'middle-info'}>
                    <div className={'info-value'}>
                        {`${wsMx.length ? (_.head(wsMx).value * 3.6).toFixed(0) : '--'}km/h`}
                    </div>
                    <div className={'info-desc'}>
                        Vento
                    </div>
                </div>
                <div className={'middle-info'}>
                    <div className={'info-value'}>
                        {`${perHour.length ? _.last(perHour).partial.slice(0, 3) : '--'}mm`}
                    </div>
                    <div className={'info-desc'}>
                        Pluviosidade
                    </div>
                </div>

            </div>
            <div className={'bottom'}>{name}</div>
        </div>
    )
};



