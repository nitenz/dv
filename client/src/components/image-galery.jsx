import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
  MDBCarouselCaption,
  MDBMask
} from "mdbreact";

import iconBed from '../imgs/icon-bed.png'
import iconBath from '../imgs/icon-bath.png'
import iconRoom from '../imgs/icon-reception.png'
import funchalImg from '../imgs/1.jpg'

const ImageGalery = (props) => {
  const data = [{
    id:1,
    locality: 'Santo António, Funchal',
    bathRooms: 2,
    bedRooms: 3,
    livingRooms:2,
    price: '155k'
  },{
    id:2,
    locality: 'Sao Martinho, Funchal',
    bathRooms: 1,
    bedRooms: 1,
    livingRooms:1,
    price: '135k'
  },{
    id:3,
    locality: 'Ajuda, Funchal',
    bathRooms: 2,
    bedRooms: 2,
    livingRooms:1,
    price: '105k',
    imgs:[]
  },{
    id:4,
    locality: 'Machico',
    bathRooms: 2,
    bedRooms: 3,
    livingRooms:2,
    price: '175k'
  }]

  const houseList = () => {
    const layout = [];
    data.forEach( (item, idx) => {
      layout.push(
        <MDBCarouselItem key={idx} itemId={item.id}>
          <MDBView>
            <img
              className="d-block w-100"
              src={funchalImg}
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">{item.locality}</h3>
            <div className="house-info">
              <img src={iconBath} /> {item.bathRooms}
              <img src={iconBed}  /> {item.bedRooms}
              <img src={iconRoom} /> {item.livingRooms}
              <p><b>Preço:</b> {item.price}</p>
            </div>
            
          </MDBCarouselCaption>
        </MDBCarouselItem>
      )
    });
    return layout;
  }

  return (
    <div>
      <MDBContainer>
        <MDBCarousel
        activeItem={1}
        length={data.length}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          {houseList()}
        </MDBCarouselInner>
      </MDBCarousel>
      </MDBContainer>
    </div>

  );
}

export default ImageGalery;