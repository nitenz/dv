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
        imgname: [],
        imgfile: []
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

        fetch('http://localhost:8080/add/imovel', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('id: ', data)
            alert('Imóvel Criado '+ data.id);
            handleEvent();
        });

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

    const handleSelectFile = (e) => {
        const { value, name } = e.target;
        let auxData = formData[name];

        auxData.push(value)

        setFormData(formData =>({
            ...formData,//keep same data from obj
            ...auxData//update the new value
        }));

        e.preventDefault();
    }

    return(
        <div className="create-imovel">
            <h1>Criar Imóvel</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleInput} type="text" name="location" id="location" className="form-control" />
                            <label className="form-label" htmlFor="location">Localização</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleInput} type="text" name="price" id="price" className="form-control" />
                            <label className="form-label" htmlFor="price">Preço</label>
                        </div>
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={handleInput} type="text" name="tipology" id="tipology" className="form-control" />
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
                
                <div className="form-outline mb-4">    
                    <input
                        type="file"
                        id="imgfile"
                        name="imgfile"
                        onChange={handleSelectFile}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Criar Imóvel</button>
            </form>
        </div>
    )
}
export default CreateImovel;