import './style.css'

export default function Header(){
    return( // Header contem apenas a logotipo e um iframe com uma playlist musical
        <header className='header'>
            <div className='logotipo'>
                <img src='../../assets/logo.png' alt='logotipo'/>
            </div>
            <div className='navFuncionalidades'>
                <ul className='listaFuncionalidades'>
                    <li className='iframeSpot'>
                        <iframe style={{borderRadius:'12px'}} src="https://open.spotify.com/embed/playlist/2cTIoYmm7pvdmSDeG8fB5H?utm_source=generator" width="" height="" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </li>
                </ul>
            </div>
        </header>
    );

}
