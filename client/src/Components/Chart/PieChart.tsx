import 'chart.js/auto'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BACK_URL } from '../../App'
import axios from 'axios'

interface PieChartProps {
    total_stable: number,
    total_unstable: number,
    total_down: number
}

interface ComponentProps {
    appId : number
}

function PieChart( { appId } : ComponentProps ) {

    const [ dataset, setDataset] = useState<PieChartProps>({} as PieChartProps)

    useEffect( () => {
        setTimeout(() => {
            setData()
        }, 1000);
    }, [dataset])

    const setData = async () => {
        setDataset(await getStats());
    }

    const getStats = async () => {
        const response = await axios.get(BACK_URL + "/real_time_stats", {params: {app_id: appId}});
        return response.data;
    }

    return (
        <div className='pie-card'>
            <h3 className='c-dark'>Real time endpoint status</h3>
            <Doughnut data={{
                labels: ["Stable", "Unstable", "Down"],
                datasets: [
                    {
                        data: [dataset.total_stable, dataset.total_unstable, dataset.total_down],
                        backgroundColor: ["#57fd81", "#fdb657", "#fc717a"]
                    }
                ]
            }}
            />
        </div>
    );
};

export default PieChart;