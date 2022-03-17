import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Context } from "./Context";
import {Dropdown, OverlayTrigger} from 'react-bootstrap';
import {buildInitialGrid} from "./Constants";
import Popover from "./Popover";
import plantDb from "./PlantDb";

let originalSettings;

function GardenSettings({initial}) {
    const { settings, setSettings, grid, setGrid } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        originalSettings = {...settings};
    }, []);

    return (
        <SettingsContainer>
            <div>
                <h6>Garden Name: </h6>
                <input type='text' placeholder='My Garden' className="m-2" value={settings['gardenName']} onChange={(e) => setSettings({ ...settings, gardenName: e.target.value })} />
                <h6>Garden Size: </h6>
                <div>
                    Length: <input style={{width: '20%'}} disabled type='number' placeholder='Length' className="m-2" min={1} value={grid.length} onChange={
                        (e) => {
                            if (parseInt(e.target.value) > 0) setGrid(buildInitialGrid(e.target.value, grid[0].length))
                        }}/>(m)
                </div>
                <div>
                    Width: <input style={{width: '20%'}} disabled type='number' placeholder='Width' className="m-2" min={1} value={grid[0].length} onChange={
                        (e) => {
                            if (parseInt(e.target.value) > 0) setGrid(buildInitialGrid(grid.length, e.target.value))
                        }} />(m)
                </div>
                <GridContainer>
                    North
                {
                    grid.map((row, i) =>
                        <GridRow key={'row' + i} className={'row'}>
                            {row.map((id, j) =>
                                <GridSquare key={'col' + j} className={'col'} />
                            )}
                        </GridRow >
                    )
                }
                </GridContainer>
                {initial &&
                    <div style={{marginTop: '20px'}}>
                        The following questions will help us make suggestions that are best for your garden.
                        You can always update them in your garden settings later.
                    </div>
                }
                <h6>How often do you want to work on your garden?</h6>
                <Dropdown className='m-2 d-flex'>
                    <Dropdown.Toggle className={settings['workFrequency'] ? 'btn-success' : 'btn-secondary'}>
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
                        <button key={key} className={settings.goals[key] ? 'btn btn-success m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, goals: { ...settings.goals, [key]: !settings.goals[key] } })}>{key}</button>
                    )}
                </div>
                <h6>Do you have any animals in your yard that may eat the plants?</h6>
                <button className={settings.animals === 'No' ? 'btn btn-success m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, animals: 'No' })}>No</button>
                <button className={settings.animals === 'Maybe' ? 'btn btn-success m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, animals: 'Maybe' })}>Maybe</button>
                <button className={settings.animals === 'Yes' ? 'btn btn-success m-2' : 'btn btn-outline-secondary m-2'} onClick={() => setSettings({ ...settings, animals: 'Yes' })}>Yes</button>
                <h6>Where are you located? (We will only use this information to check your local climate)</h6>
                <p>Country</p>
                <input type='text' value='Canada' readOnly />
                <p>City</p>
                <input type='text' value='Waterloo' readOnly />
                <h6>What is your approximate budget?</h6>
                <input type='number' placeholder='$ (CAD)' min={0} value={settings.budget} onChange={(e) => setSettings({ ...settings, budget: e.value.target })} />
                <div className='d-flex flex-direction-row w-100 align-items-center justify-content-center mt-4'>
                    {!initial && <button className="btn btn-danger mx-1" onClick={() => { setSettings(originalSettings); navigate('/garden') }}>
                        Exit Without Saving
                    </button> }
                    <button className='btn btn-primary mx-1' onClick={() => navigate('/garden')}>
                        {initial ? 'Continue' : 'Save and Exit' }
                    </button>
                </div>
            </div>
        </SettingsContainer>
    )
}

const SettingsContainer = styled.div`
    height: 100%;
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

const GridContainer = styled.div`
    margin: 5px 50px;
    text-align: center;
`;

const GridSquare = styled.div`
    border: 1px solid black;
    height: 20px;
    width: 20px;
    padding: 0;
`;

const GridRow = styled.div`
    margin: auto;
`;

export default GardenSettings
