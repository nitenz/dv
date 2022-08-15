import React, { useEffect,useState } from 'react';

const CreateImovel = (props) => {
    const handleEvent = props.event,
    [ formData, setFormData ] = useState({
        location:'',
        price:'',
        tipology:'',
        rooms: 0,
        bathrooms:0,
        livingrooms:0,
        imgfiles: []
    });

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    const handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( formData )
        };
        if(formData.location && formData.price && formData.tipology){
            fetch('http://localhost:8080/add/imovel', requestOptions)
            .then(response => response.json())
            .then(data => {
                var dataToSubmit = new FormData();
    
                dataToSubmit.append('id', data.id)
                formData.imgfiles.map(img=>{
                    dataToSubmit.append('file',img)
                })
                
                const requestOptionsImage = {
                    method: 'POST',
                    body:  dataToSubmit
                };
    
                fetch('http://localhost:8080/add/images', requestOptionsImage)
                .then(response => response.json())
                .then(data => {
                    alert('Imóvel Criado '+ data.id);
                    handleEvent();
                })
            });
        }
      

        e.preventDefault();
    }

    const handleInput = (e) => {
        const { value, name } = e.target;

        setFormData(formData =>({
            ...formData,//keep same data from obj
            ...{ [name]: value }//update the new value
        }));

        e.preventDefault();
    }

    const handleRemoveImageFromList = (e) => {
        const imgPosition = e.target.parentElement.id;

        setFormData( data => ({
            ...formData,//keep same data from obj
            ...{ imgfiles: formData.imgfiles.filter( (item,idx) => idx !== Number(imgPosition)) }//update the new value
        }));
    }

    return(
        <div className="create-imovel">
            <h1>Criar Imóvel</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleInput} required type="text" name="location" id="location" className="form-control" />
                            <label className="form-label" htmlFor="location">Localização</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleInput} required type="text" name="price" id="price" className="form-control" />
                            <label className="form-label" htmlFor="price">Preço</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} type="text" required name="tipology" id="tipology" className="form-control" />
                    <label className="form-label" htmlFor="tipology">Tipologia</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} type="number" name="rooms" id="rooms" className="form-control" />
                    <label className="form-label" htmlFor="rooms">Quartos de dormir</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} type="number" name="bathrooms" id="bathrooms" className="form-control" />
                    <label className="form-label" htmlFor="bathrooms">Casas de banho</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} type="number" name="livingrooms" id="livingrooms" className="form-control" />
                    <label className="form-label" htmlFor="livingrooms">Salas de estar</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Criar Imóvel</button>
            </form>

            <div className="image-uploader">
                <h1>Upload images:</h1>
                <div className="container" >
                    <div >
                        {formData.imgfiles.map( (img,idx) => {
                            return img &&
                            (
                                <div className="image-uploader-preview" key={idx} id={idx}>
                                    <img alt="not fount" height={"150px"} width={"250px"} src={URL.createObjectURL(img)} />
                                    <button onClick={handleRemoveImageFromList} data-mdb-toggle="tooltip" title="Remove image" >X</button>
                                </div>
                            )
                        })}
                    </div>
                
                    <div >
                        <input
                            id="img-select"
                            type="file"
                            name="images"
                            multiple={true}
                            onChange={(event) => {
                                let auxList = formData.imgfiles;
                                let filesList = event.target.files;

                                for (let key in filesList) {
                                    if(filesList[key].type) auxList.push(filesList[key])
                                }
                            
                                setFormData( () => ({
                                    ...formData,//keep same data from obj
                                    ...{ imgfiles: auxList}//update the new value
                                }));
                            }}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default CreateImovel;