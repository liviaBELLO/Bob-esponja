import './style.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function Cards({}){
    const [personagens, setPersonagens] = useState([]);
    const [pessoa, setPessoa] = useState(['']);   
    
    const [gradientes, setGradientes] = useState([ 
        // Criando cores diferentes que serão aplicadas para cada elemento de card   
        'linear-gradient(0deg, rgba(228,239,103,1) 19%, rgba(249,255,179,1) 100%)', 
        'linear-gradient(360deg, rgba(173,221,125,1) 19%, rgba(211,255,166,1) 100%)',
        'linear-gradient(360deg, rgba(177,187,184,1) 19%, rgba(220,237,232,1) 100%)',
        'linear-gradient(360deg, rgba(58,164,185,1) 19%, rgba(76,226,255,1) 100%)',
        'linear-gradient(360deg, rgba(186,141,100,1) 19%, rgba(251,213,180,1) 100%)',
        'linear-gradient(360deg, rgba(223,153,143,1) 19%, rgba(253,215,210,1) 100%)',
        'linear-gradient(360deg, rgba(109,168,175,1) 19%, rgba(181,224,247,1) 100%)',
        'linear-gradient(360deg, rgba(168,153,133,1) 19%, rgba(209,187,162,1) 100%)',
        'linear-gradient(360deg, rgba(238,238,86,1) 19%, rgba(253,253,174,1) 100%)'   
    ]);
    const [sombras, setSombras] = useState([ // Sombras que serão aplicadas para cada card
        ' 6px 6px 3px rgba(205, 216, 84, 1)', 
        ' 6px 6px 3px rgba(161, 200, 121, 1)', 
        ' 6px 6px 3px rgba(179, 204, 196, 1)', 
        ' 6px 6px 3px rgba(44, 111, 124, 1)', 
        ' 6px 6px 3px rgba(187, 140, 99, 1)', 
        ' 6px 6px 3px rgba(200, 145, 137, 1)', 
        ' 6px 6px 3px rgba(88, 133, 139, 1)', 
        ' 6px 6px 3px rgba(131, 108, 87, 1)', 
        ' 6px 6px 3px rgba(173, 173, 75, 1)'
    ]); 

    useEffect(() => { // Requisição para conseguir os dados de cada personagem
        axios.get("https://api-bob-isqd.onrender.com/personagens").then((response) => {
            const dados = response.data;
            setPersonagens(dados)
        }).catch((error) => {
            console.log(error)
        })
    },[]);

    function SendData(nome) { // Enviando os dados do personagem favorito do usuario
        let codigo = window.prompt('Digite seu codigo (apenas numeros)') // Código do usuario (Só aceita numeros)

        axios.post("https://api-bob-isqd.onrender.com/lista-favorito/salvar", {
            codigo: codigo,
            listaCard: nome
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            alert('Codigo ja existe ou é inválido. Escolha outro para poder salvar seu personagem');
            location.reload();
          });

        // Mostrando personagem favorito do usuario
        // O usuario ira poder ver seu personagem escolhido mesmo se o codigo for invalido
        // Com o codigo invalido ou pré existente o banco de dados nao ira receber o codigo do usuario  
        function showFav(){
            // Buscando elementos no documento
            let main = document.querySelector('main')
            let filhos = [...main.children] // Operador spread para buscar todos os elemetos filhos de main
            filhos.map(e => {
                e.style.cssText = 'display: none'; // Apagando os elementos filhos de main
            })

            let newDiv = document.createElement('div') // Criando elemento para substituir os apagados

            newDiv.innerHTML = `
                               <div class="favParent">     
                                    <div class="favContainer"> 
                                        <div class="favPersonagem">
                                            <div className="favTitle">
                                                <h2> Seu personagem favorito é:</h2> 
                                            </div> 
                                            <div class="favImg"> 
                                                <img src="../../../public/assets/${nome}.png"                                 
                                            </div>
                                            <div class="nomeFav">
                                            <h2> ${nome} </h2>
                                            </div>                                
                                        </div>  
                                    </div>
                               </div>`;
            main.appendChild(newDiv) // Adicionando a nova div ao documento
        }
        showFav();
    }
    return( // Pagina carregada ao entrar no site
        <main className='main'>
            {personagens?.map((personagem, index) => {
                var e = personagem.name;
                return(
                    <div className='cardContainer' key={personagem.id}>
                        <div className='cardPersonagem' style={{ background: gradientes[index % gradientes.length], boxShadow: sombras[index % sombras.length]}}>
                            <div className='imagem'>
                                <img src={personagem.imagem_url} alt='foto' />    
                            </div>
                            <div className='nomePersonagem'> 
                                <h2>{personagem.name}</h2>
                            </div>
                        </div>
                        <div className='textContainer'> 
                            <p>{personagem.description}</p>
                        </div>
                        <div className='btnContainer'>
                            <button className='btnShow' onClick={() => SendData(e)}><p>Escolha como <br></br> favorito</p></button>
                        </div>
                    </div>
                )
            })}
        </main>
    );
}
