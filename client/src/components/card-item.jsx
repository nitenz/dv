import iconBed from '../imgs/icon-bed.png'
import iconBath from '../imgs/icon-bath.png'
import iconRoom from '../imgs/icon-reception.png'
import CustomImgGalery from '../components/custom-img-galery'

const CardItem = (props) => {
    const handleExpand = (e) => {
        console.log('oi');
    }
    const data = props.item;

    const {
        id,
        location,
        price,
        rooms,
        livingrooms,
        bathrooms
    } = props.item;

    return(
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title"><b>{location}</b></h5>
                <div className="house-info" id={id}>
                    <img src={iconBath}  data-mdb-toggle="tooltip" title="Bath rooms"/> {bathrooms}
                    <img src={iconBed}  data-mdb-toggle="tooltip" title="Sleeping rooms"/> {rooms}
                    <img src={iconRoom}  data-mdb-toggle="tooltip" title="Living rooms"/> {livingrooms}
                    <p><b>Preço:</b> {price}</p>
                </div>
            </div>
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light" data-toggle="modal" data-target={`basicExampleModal${id}`}>
                <CustomImgGalery data={data} />
                <a href="#!">
                <div className="mask" 
                 style={{
                    backgroundColor: 'rgba(251, 251, 251, 0.15)'
                  }}></div>
                </a>
            </div>
        </div>
    )
}

export default CardItem;