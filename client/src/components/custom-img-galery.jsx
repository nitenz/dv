
import React from 'react'
import Carousel from 'better-react-carousel'

const CustomImageGalery = ( props ) => {
    const data = props.data.img;
    const id   = props.data.id;

    const createTemplate = (imageList, id) => {
        let templateList = [];

        if(imageList && imageList.length){
            imageList.map( (img, idx ) => {
                templateList.push(
                    <Carousel.Item key={idx}>
                        <img alt={img} width="100%" height="574px" src={`http://localhost:8080/imoveis/${id}/${img}` } />
                    </Carousel.Item>
                )
            })
        }
        return templateList;
    }

    return(
        <div>
            <Carousel cols={3} rows={1} gap={5} loop>
                {
                   createTemplate(data, id)
                }
            </Carousel>
        </div>
    )
}

export default CustomImageGalery;