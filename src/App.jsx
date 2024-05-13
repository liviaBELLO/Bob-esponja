import Header from './components/Header/';
import Cards from './components/Cards/';

import './App.css';
export default function App() {
  return (
    // Fragment para nao ter que utilizar alguma tag html e nao prejudicar a estilização
    <> 
      <Header></Header>
      <Cards></Cards>
    </>
  )
}

