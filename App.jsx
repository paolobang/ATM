const ATMDeposit = ({  isDeposit, input }) => {
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <div className="container-screen"   >
        
        {/* {choice[Number(!isDeposit)]} */}
        
        <div className='input' >
            {input}
        </div>
      </div>

    );
  };
  const Boton = (props) => {
    return (
      <div className={`btn-container`}
      onClick={() => props.handleClick(props.children)}>
        {props.children}
      </div>
    );
  };
  const BotonClear = (props) => {
    return(
      <div className="btn-clear"
        onClick={props.handleClear}>
  
        {props.children}
      </div>
    );
  };
  const BotonSubmit = (props) => {
    return(
      <div className="btn-submit">
        {props.children}
      </div>
    );
  };

  const Account = () => {
    let deposit = 0; // state of this transaction

    
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(null);
    const [input, setInput] = React.useState('0');
    const [atmMode, setAtmMode] = React.useState('');
    const [status, setStatus] = React.useState('Welcome to ATM.');
    const [message, setMessage] = React.useState('Choose a transaction.');
    
    const choice = ["Deposit", "Cash Back"];

    // let status = `Account Balance US$ ${Number(totalState)} `;
    // message = `Choose a transaction.`;

    // Show value on screen
    const addInput = val => {
        const e = document.getElementById('txt-alert');
        if (isDeposit === null) {
            e.classList.add('resalt');
            console.log('selecciona pe ctv')
        } else if ( atmMode === 'Cash Back' && (Number(input + val)) > totalState) {
            // console.log('Es isDeposit ',isDeposit) //isDeposit aqui es falso si el importe es mayor a retiro
            
            // e.innerHTML = `Your withdraw limit is US$ ${Number(totalState)} `
            setMessage( `Your withdraw limit is US$ ${Number(totalState)} `)
            e.classList.add('resalt');
            setInput(0);
        } else {            
            deposit = (Number(input + val));
            setMessage(`Transaction selected: ${atmMode}.`)
            e.classList.remove('resalt');
            setInput(deposit);
            
        }
    };

  
          
    const handleSubmit = (event) => {
     const e = document.getElementById('txt-alert');
     // No option was selected when push Proceed Submit Button
     if (isDeposit == null) {
        e.innerHTML = 'Alert: You need choose a transaction.'
        e.classList.add('resalt');
     } else {
        // e.innerHTML = 'Welcome to your Bank'
        e.classList.remove('resalt');
        console.log('Mensaje', message);

        let newTotal = isDeposit ? Number(totalState) + Number(input) : Number(totalState) - Number(input);
        setTotalState(newTotal);
        setInput('0'); // Clean screen after submit
        setStatus(`Account Balance US$ ${Number(newTotal).toLocaleString(undefined, { maximumFractionDigits: 2 })}`)

    
        
        
     }
     
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
        const dp = document.getElementById('btn-depo');
        const cs = document.getElementById('btn-cash');
        setAtmMode(event.target.value); //atmMode Deposit or Cash Back

        // Conditional for main option buttons
        if (event.target.value === 'Deposit') {
            dp.classList.add('active')
            cs.classList.remove('active')
            setIsDeposit(true);
            setInput(0);  // Clean screen after submit
            
            setMessage('Transaction selected: Deposit.')
          } else if (event.target.value === 'Cash Back') {
            cs.classList.add('active');
            dp.classList.remove('active');
            setIsDeposit(false);
            setInput(0);  // Clean screen after submit
            
            setMessage('Transaction selected: Cash Back.');
          } else {
            setIsDeposit(null);
            setInput(0);  // Clean screen after submit
          }
          
    };

    return (
      <form onSubmit={handleSubmit}> 
        <div className="container-data">
        
            <div className="container-txt">
            <h2 id="total">{status}</h2>
            <p id="txt-alert">{message}</p>
                
                <ATMDeposit  isDeposit={isDeposit} input={input}  ></ATMDeposit>
            </div>
            <div className="container-opt">
                <button onClick={(e) => handleModeSelect(e)} id="btn-depo" className="btn-depo" value="Deposit">Deposit</button>
                <button onClick={(e) => handleModeSelect(e)} id="btn-cash" className="btn-cash" value="Cash Back">Cash Back</button>
            </div>
        </div>
        <div className="container-atm">
           <div className="row">
             <Boton handleClick={addInput}>7</Boton>
             <Boton handleClick={addInput}>8</Boton>
             <Boton handleClick={addInput}>9</Boton>
           </div>
           <div className="row">
             <Boton handleClick={addInput}>4</Boton>
             <Boton handleClick={addInput}>5</Boton>
             <Boton handleClick={addInput}>6</Boton>
           </div>
           <div className="row">
             <Boton handleClick={addInput}>1</Boton>
             <Boton handleClick={addInput}>2</Boton>
             <Boton handleClick={addInput}>3</Boton>
           </div>
           <div className="row">
             <BotonClear handleClear={()=> setInput('0')}>
               Clear
             </BotonClear>
             <Boton handleClick={addInput}>0</Boton>
             <input className="btn-submit" type="submit" value="Proceed" ></input>

           </div>
           <div className="row"></div>
         </div>
         <div class="footer-author">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
            <span> Powered by </span>
            <a href="https://github.com/paolobang" target="_blank"> 
            <span>@paolobang</span></a>
        </div>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById("root"));
  