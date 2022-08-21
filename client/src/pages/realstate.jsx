import CardItem from '../components/card-item'
import './realstate.scss'
import React, { useEffect, useState } from 'react';

const RealState = ( props ) => {
    const [realStateData, setRealStateData] = useState({
        imoveisList: props.data.data || getData(),
        locality: '',
        price: ''
    });

    const getData = () => {
        fetch('http://localhost:8080/imoveis/')
        .then(response => response.json())
        .then(data => {
            return data;
        });
    }
    const applyFilterToImoveisList = (name, value) => {
        return new Promise( (resolve, reject) => {
            let auxIdx = 0;
            
            let imoveistListWithFilter = props.data.data.filter( (imovel,idx) =>  {
                auxIdx = idx;
                
                if(name==='locality' && value === '' && !realStateData.price){
                    resolve(props.data.data);
                }else if((name === 'locality' && value !== '') && realStateData.price ){// price & locality filter
                    return (imovel.locality.toLowerCase().trim() === value.toLowerCase().trim()) && (imovel.price.toLowerCase().trim() === realStateData.price.toLowerCase().trim());
                }else if((name === 'locality' && value !== '') && !realStateData.price){//locality filter
                    return (imovel.locality.toLowerCase().trim() === value.toLowerCase().trim());
                }else if(name === 'price' && !realStateData.locality){
                    return (imovel.price.toLowerCase().trim() === value.toLowerCase().trim());
                }else if(name === 'price' && realStateData.locality){
                    return (imovel.price.toLowerCase().trim() === value.toLowerCase().trim()) && (imovel.locality.toLowerCase().trim() === realStateData.locality.toLowerCase().trim());
                }else if(name==='locality' && value === '' && realStateData.price){
                    return (imovel.price.toLowerCase().trim() === realStateData.price.toLowerCase().trim());
                }
            })
            if(auxIdx+1 ===  props.data.data.length) {
                resolve(imoveistListWithFilter);
            }
         });
    }
    
    const cardList = () => {
        const realstatePropertiesList = [];

        if(realStateData.imoveisList && realStateData.imoveisList.length > 0){
            realStateData.imoveisList.map( (realStateProperty,idx) => {
                realstatePropertiesList.push( <CardItem key={idx} item={realStateProperty} /> )
            })
            
        }
        if(realstatePropertiesList.length === realStateData.imoveisList.length)  return realstatePropertiesList;   
    }

    const filterEvent = (e) => {
        const {name, value} = e.target;
  
        applyFilterToImoveisList(name, value).then( data => {

            setRealStateData(formData =>(
                {
                    ...formData,//keep same data from obj
                    ...{ [name]: value, imoveisList: data}//update the new value
                }
            ));
            
         })
    }
 
    const resetFilters = () => {
        document.getElementById('price').value = '';
        document.getElementById('locality').selectedIndex = null;

        setRealStateData({
            imoveisList: props.data.data,
            locality: '',
            price: ''
        });
    }

    return(
        <div className="realstate">
            <h1>Imóveis</h1>
            <div className="filters">
                <div className="filter-container">
                    <label className="form-label" htmlFor="locality">Concelho</label><br/>
                    <select onChange={filterEvent} data-caption="Concelho" name="locality" id="locality" data-applykey="Guardar">
                        <option data-default-option="true"></option>
                        <option>Câmara de Lobos</option>
                        <option>Funchal</option>
                        <option>Machico</option>
                        <option>Porto Moniz</option>
                        <option>Porto Santo</option>
                        <option>Santa Cruz</option>
                        <option>Santana</option>
                        <option>São Vicente</option>
                    </select>
                </div>
                <div className="filter-container">
                    <label className="form-label" htmlFor="bathrooms">Price</label>
                    <input onChange={filterEvent} type="number" name="price" id="price" className="form-control" />
                </div>
                <div className="filter-container">
                    <button onClick={resetFilters} >Reset Filters:</button>
                </div>
            </div>
            <div>
                {cardList()}
            </div>
        </div>
    )
}

export default RealState;