import {TopNavBar} from "./TopNavBar";
import React from "react";

function PlantDictionary () {
    return (
        <div className={'container'}>
            <TopNavBar title={'My Plants'} route={'/garden'}/>
        </div>
    )
}

export default PlantDictionary
