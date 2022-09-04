import CardItem  from '../components/card-item'
import React from 'react';
import './my-imoveis.scss'

const MyImoveis = (props) => {
    const userId = props.userId || null;
    const myImoveisList = props.data.data;

    const generateHtml = () => {
        const imoveisList = [];

        if(myImoveisList && myImoveisList.length > 0 ){
            myImoveisList.filter( (imovel,idx) => {
                if(imovel.user_id === Number(userId)){
                    imoveisList.push(<CardItem key={idx} idx={idx} item={imovel} />);
                }
            });
        }else{
            imoveisList.push(<p key={0}>NO DATA TO SHOW</p>)
        }

        return imoveisList;
    }

    return(
        <div className="my-imoveis-galery">
            <h4>Meus imóveis:</h4>
            {
                generateHtml() 
            }
        </div>
    )
}

export default MyImoveis;