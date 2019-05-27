import React from 'react';
import '../../scss/spinner.css'

export const RingSpinner = () => {
    return (
        <div className="lds-ring">
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
};


export const DefaultSpinner = () => {
    return (
        <div className="lds-spinner">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
};
