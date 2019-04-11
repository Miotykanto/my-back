import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' 
import 'bootstrap/dist/css/bootstrap.min.css'



class Liste extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
       };
  }

  callAPI() {
      fetch("http://localhost:8080/List")
          .then(res => res.json())
          .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
    console.log(this.state.apiResponse);
    
  
}
submit1 = (a,nom,prenom) => {
  confirmAlert({
      customUI: ({ onClose }) => {
        return (  
          <div className="custom-ui" id="popup">
            <form method="POST" action="http://localhost:8080/list" enctype="application/x-www-form-urlencoded">
                <input type="hidden" name="_method" value="PUT"></input>
                <label>nom:   </label> <input placeholder={nom} type="text" name="nom"/><br/>
                <label>prenom:</label> <input placeholder={prenom} type="text"name="prenom"/><br/>
                <label>prenom:</label> <input type="hidden"name="id" value={a}/>
                <button>envoyer</button>
                </form>
          </div>
        );
      }
    })
};
 
  render() {
    return (
      <div>    
         <button onClick={()=> {
            var test=this.state.apiResponse
            // console.log(JSON.parse(test));
            
          //  var test=JSON.parse(test)
           
            for(let i=0;i<test.length;i++){ 
          
              document.getElementById('va').innerHTML+="<div>"+test[i].nom+"</div>"
              document.getElementById('va').innerHTML+="<div>"+test[i].prenom+"</div> <br/>"
              
            }
            
           }}>Liste</button>

          


        <div id="va">
        
        {this.state.apiResponse.length>0?this.state.apiResponse.map((im)=>{
              return  <div>
                    <div key={im.id}>{im.nom}</div>
                    <div key={im.id+"h"}>{im.prenom}<br/></div>
                    <button onClick={()=>{this.submit1(im.id,im.nom,im.prenom)}}>edit</button>


                <form method="POST" action="http://localhost:8080/list" enctype="application/x-www-form-urlencoded">
                  <input type="hidden" name="_method" value="DELETE"></input>  
                  <input type="hidden"name="id" value={im.id}/>   
                  <button>delete</button>
                </form>
                </div>     
        }  
              ):(<div></div>)}
        </div> 
              <div>
                <form action="http://localhost:8080/list" method = "POST">
                
                <label>nom:   </label> <input type="text" name="nom"/><br/>
                <label>prenom:</label> <input type="text"name="prenom"/><br/>
                <button>envoyer</button>
                </form>
              </div>
      </div>
    );
  }
}

export default Liste;