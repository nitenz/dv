import CardItem from '../components/card-item'

import React, { useEffect } from 'react';

const RealState = ( props ) => {
    
    const cardList = () => {
        const realstatePropertiesList = [];
        let tempData = props.data;

        if(tempData && tempData.length){
            tempData.map( (realStateProperty,idx) => {
                realstatePropertiesList.push( <CardItem key={idx} item={realStateProperty} /> )
            })
            
    
            if(realstatePropertiesList.length === tempData.length)  return realstatePropertiesList;   
        }
        
    }

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    return(
        <div className="realstate">
            <h1>Imóveis</h1>
            <div>
                {cardList()}
            </div>
        </div>
    )
}

export default RealState;