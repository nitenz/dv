const Menu = ({handleClick}) => {
    return(
        <div className="menu">
            <a onClick={handleClick} href="/home">Home</a>
            <a onClick={handleClick} href="/who">Quem Somos</a>
            <a onClick={handleClick} href="/realstate">List</a>
            <a onClick={handleClick} href="/contacts">Contactos</a>
            <a onClick={handleClick} href="/admin">admin</a>
        </div>
    )
}

export default Menu;