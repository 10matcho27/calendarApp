import React, { useState } from 'react';
import ReactDOM from 'react-dom'
  
  const Button = () =>{
  const [count, setCount] = useState(0);
  function alertSubmitFunction(){
    
    alert("Submitted")

  }
  
  return (
    <div>
      <button onClick={() => alertSubmitFunction()}>
      提出
      </button>
    </div>
  );}


  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      < Button/>,
      document.body.appendChild(document.createElement('div')),
    )
  })
