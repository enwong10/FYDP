import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Context, defaultSettings } from "./Context";
import { Dropdown } from 'react-bootstrap';

function GardenSettings() {
    const { settings, setSettings } = useContext(Context);
    const navigate = useNavigate();

    return (
        <SettingsContainer>
            <div>
                <h1>Garden Settings</h1>
                <h6>Garden Name: </h6>
                <input type='text' placeholder='My Garden' className="m-2" value={settings['gardenName']} onChange={(e) => setSettings({ ...settings, gardenName: e.target.value })} />
                <h6>How often do you want to work on your garden?</h6>
                <Dropdown className='m-2 d-flex'>
                    <Dropdown.Toggle className='btn-secondary'>
                        {settings['workFrequency']}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='w-100'>
                        <Dropdown.Item onClick={() => setSettings({ ...settings, workFrequency: 'Daily' })}>Daily</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSettings({ ...settings, workFrequency: 'Weekly' })}>Weekly</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSettings({ ...settings, workFrequency: 'Monthly' })}>Monthly</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h6>What are your goals with the garden?</h6>
                <div className="d-flex flex-direction-row flex-wrap">
                    {Object.keys(settings.goals).map((key) =>
                        <button key={key} className={settings.goals[key] ? 'btn btn-secondary m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, goals: { ...settings.goals, [key]: !settings.goals[key] } })}>{key}</button>
                    )}
                </div>
                <h6>Do you have any animals in your yard that may eat the plants?</h6>
                <button className={settings.animals === 'No' ? 'btn btn-secondary m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, animals: 'No' })}>No</button>
                <button className={settings.animals === 'Maybe' ? 'btn btn-secondary m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, animals: 'Maybe' })}>Maybe</button>
                <button className={settings.animals === 'Yes' ? 'btn btn-secondary m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, animals: 'Yes' })}>Yes</button>
                <h6>Where are you located? (We will only use this information to check your local climate)</h6>
                <p>Country</p>
                <input type='text' value='Canada' readOnly />
                <p>City</p>
                <input type='text' value='Waterloo' readOnly />
                <h6>What is your approximate budget?</h6>
                <input type='number' placeholder='$ (CAD)' min={0} value={settings.budget} onChange={(e) => setSettings({ ...settings, budget: e.value.target })} />
                <div className='d-flex flex-direction-row w-100 align-items-center justify-content-center mt-4'>
                    <button className="btn btn-danger mx-1" onClick={() => { setSettings(defaultSettings); navigate('/garden') }}>Exit Without Saving</button>
                    <button className='btn btn-primary mx-1' onClick={() => navigate('/garden')}>Save and Exit</button>
                </div>
            </div>
        </SettingsContainer>
    )
}

const SettingsContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;

    > div {
        width: 100%;
        max-width: 400px;
        margin: auto;
        padding: 5% 0;
    }

    h6 {
        margin-top: 12px;
    }

    .dropdown-toggle {
        min-height: 38px;
        flex: 1;
    }

    .dropdown-toggle::after {
        position: absolute; 
        right: 12px;
        top: 18px;
    }
`

export default GardenSettings
