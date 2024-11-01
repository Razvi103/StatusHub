import React, { useEffect, useRef, useState } from 'react';
import 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import "./LineChart.css"
import axios from 'axios';
import { BACK_URL } from '../../App';

interface Element {
    label : string,
    data : number[]
}

interface ComponentProps {
    appId : number
}

function LineChart( { appId } : ComponentProps ) {

    const [ interval, setInterval ] = useState(12)
    const [ dataset, setDataset ] = useState<Element[]>([{} as Element])

    useEffect( () => {
        setTimeout(() => {
            setData()
        }, 1000);
    }, [dataset])

    const setData = async () => {
        setDataset(await getStats());
    }

    const getStats = async () => {
        const response = await axios.get(BACK_URL + "/get_endpoint_stats", {params: {app_id: appId, interval: interval}});
        console.log(response.data);
        
        return response.data;
    }

    const options = {
        scales: {
            y: {
                min: 0, // Start y-axis at 0
                max: 4, // Limit y-axis to 3
            },
        },
    };


    return (
        <div className='line-card'>
            <div className='row'>
                <h3 className='c-dark'>Endpoint status over time</h3>
                <div className='right'>
                    <div className={'hour ' + (interval === 1 ? "c-surface bg-primary b-primary" : "c-light b-light bg-background" )} onClick={ () => setInterval(1) }>1 h</div>
                    <div className={'hour ' + (interval === 6 ? "c-surface bg-primary b-primary" : "c-light b-light bg-background" )} onClick={ () => setInterval(6) }>6 h</div>
                    <div className={'hour ' + (interval === 12 ? "c-surface bg-primary b-primary" : "c-light b-light bg-background" )} onClick={ () => setInterval(12) }>12h</div>
                </div>
            </div>
            <Line data={{
                labels: Array.from({ length: 12 }, (_, index) =>index+1),
                datasets: dataset
            }}
            options={options}
            />
        </div>
    );
};

export default LineChart;