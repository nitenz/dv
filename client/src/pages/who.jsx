import image from '../imgs/room.jpg'
const Who = () => {

    return(
        <div className="who-page" style={{ 
            backgroundImage: `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 30%',
            height: '40vw'
        }}>
            <div className="who-page-container">
                <div className="text">
                Quem somos<br></br>
                Torne o seu Sonho uma Realidade<br></br>
                
                Definimos para a nossa actuação, a total satisfação do nosso cliente em todo o processo imobiliário, encontrando a melhor solução para um momento importante da sua vida.<br></br>
                
                Cada caso é um caso". A missão é atender seus clientes com excelência, transparência e segurança para atingir e superar expectativas, sempre buscando o melhor. Em evolução constante, faz com que a qualidade de seus serviços e a satisfação de seus clientes seja garantida. Por isso, utiliza-se a experiência no mercado como base para superar novos desafios, mantendo-se preparada para o futuro do sector, sempre à frente de seu tempo.<br></br>
                
                Estaremos focados na conquista dos sonhos e projectos dos nossos clientes.
                </div>
                
            </div>
      
        </div>
    )
}

export default Who;