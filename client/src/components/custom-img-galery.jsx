
import React from 'react'
import Carousel from 'better-react-carousel'
import './custom-img-galery.scss'

const CustomImageGalery = ( props ) => {
    const data = props.data.img;
    const id   = props.data.id;

    const createTemplate = (imageList, id) => {
        let templateList = [];

        if(imageList && imageList.length){
            imageList.map( (img, idx ) => {
                templateList.push(
                    <Carousel.Item key={idx}>
                        <img className="custom-galery-img" alt={img.title} src={img.src} />
                    </Carousel.Item>
                )
            })
        }
        return templateList;
    }

    return(
        <div className="custom-galery">
            <Carousel cols={1} rows={1} gap={5} loop>
                {
                   createTemplate(data, id)
                }
            </Carousel>
        </div>
    )
}

export default CustomImageGalery;