import React, { useEffect,useState } from 'react';
import './create-imovel.scss'
import LoadingSpinner from '../components/spinner'

const CreateImovel = (props) => {
    const handleEvent = props.event,
    [isLoading, setIsLoading] = useState(false),
    [ parishList, setParishList] = useState([]),
    [ formData, setFormData ] = useState({
        userId: '',
        locality:'',
        price:'',
        tipology:'',
        rooms: 0,
        bathrooms:0,
        livingrooms:0,
        imgfiles: []
    });

     const parishes = {
        'Funchal': [
           'Imaculado Coração de Maria', 
           'Monte','Santa Luzia', 
           'Santo António', 
           'São Gonçalo', 
           'São Martinho', 
           'S. Pedro', 
           'Santa Maria Maior', 
           'S. Roque',
           'Sé'],
        'Câmara de Lobos':  [
            'Câmara de Lobos',
            'Curral das Freiras',
            'Estreito de Câmara de Lobos',
            'Jardim da Serra',
            'Quinta Grande'
         ],
        'Machico': [
            'Água de Pena', 
            'Caniçal', 
            'Machico', 
            'Porto da Cruz',
            'Santo António da Serra'
         ],
        'Porto Moniz': [
           'Achadas da Cruz', 
           'Porto Moniz', 
           'Ribeira da Janela',
           'Seixal'
         ],
        'Porto Santo': [
           'Porto Santo'
         ],
         'Santa Cruz': [
           'Camacha',
           'Caniço',
           'Gaula',
           'Santa Cruz',
           'Santo António da Serra'
         ],
        'Santana': [
           'Arco de São Jorge',
           'Faial',
           'Ilha',
           'Santana',
           'São Jorge',
           'São Roque do Faial'
         ],
        'São Vicente': [
           'Boa Ventura',
           'Ponta Delgada',
           'São Vicente'
         ]
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    const handleSubmit = (e) => {
        formData.userId= props.userId;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( formData )
        };
        if(formData.locality && formData.price && formData.tipology){
            setIsLoading(true);

            fetch('http://localhost:8080/imoveis', requestOptions)
            .then(response => response.json())
            .then(data => {
                const id = data.data.id;
                var dataToSubmit = new FormData();
                dataToSubmit.append('id',id)
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
                    if(data.msg){
                        alert(data.msg);
                        handleEvent(setIsLoading(false) );
                    }
                })
            });
        }
      

        e.preventDefault();
    }

    const handleInput = (e) => {
        const { value, name } = e.target;

        if(name === 'locality'){
            if(!value)setParishList([])
            setParishList(parishes[value])
        }

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

    const createParishOptions = () => {
        const aux = []

        if(parishList){
            parishList.map( (parishItem,idx) => {
                aux.push(<option key={idx}>{parishItem}</option>);
            })
        }
       
        return aux;
    }

    return(
        <div className="create-imovel">
            <h1>Criar Imóvel</h1>
            {isLoading ? <LoadingSpinner /> : ''}
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                           
                            <select onChange={handleInput} required data-caption="Concelho" name="locality" id="locality" data-applykey="Guardar">
                                <option data-default-option="true"></option>
                                <option>Câmara de Lobos</option>
                                <option>Funchal</option>
                                <option>Machico</option>
                                <option>Porto Moniz</option>
                                <option>Porto Santo</option>
                                <option>Santa Cruz</option>
                                <option>Santana</option>
                                <option>São Vicente</option>
                            </select><br/>
                            <label className="form-label" htmlFor="locality">Concelho</label>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-outline">
                            <select onChange={handleInput} required data-caption="Concelho" name="parish" id="parish" data-applykey="Guardar">
                                <option data-default-option="true"></option>
                                {
                                    createParishOptions()
                                }
                            </select>

                            <label className="form-label" htmlFor="parish">Freguesia</label>
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
                <button type="submit" className="btn btn-primary btn-block mb-4">Criar Imóvel</button>
            </form>
        </div>
    )
}
export default CreateImovel;