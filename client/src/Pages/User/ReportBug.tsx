import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BACK_URL } from '../../App';
import UserHeader from '../../Components/Navigation/UserHeader';
import "./ReportBug.css"
import InputField from '../../Components/Input/InputField';
import IconButton from '../../Components/Button/IconButton';
import { useNavigate } from 'react-router-dom';

function ReportBug( ) {

    const navigate = useNavigate()

    const [endpoint, setEndpoint] = useState(0)
    const [description, setDescription] = useState("")

    const sendBug = async () => {
        const response = await axios.post(BACK_URL + "/add_bug",  {"endpoint_id": endpoint, "description": description} );
        navigate(-1)
    }

    return (
        <div className='report-bug'>
            <UserHeader pageName={"Report "} />
            <div className='page-content bg-surface'>
                <h2>Report a bug</h2>
                <p className='label sub-title'>Report a bug in your application at any given endpoint.</p>

                <InputField label={'Endpoint'} value={endpoint} setValue={ (newValue) => setEndpoint(newValue) } type={'number'} placeholder={'Enter an endpoint id'} className={''}></InputField>
                <InputField label={'Description'} value={description} setValue={ (newValue) => setDescription(newValue) } type={'text'} placeholder={'Enter a description for the bug'} className={'textarea'}></InputField>
                <div className='row'>
                    <IconButton text={'Report bug'} 
                    onClick={ () => {sendBug(), navigate(-1) } } 
                    className={'bg-primary c-surface'} 
                    icon={'bug'}
                />
                </div>
            </div>
        </div>
    );
};

export default ReportBug;