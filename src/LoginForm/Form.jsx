import React from 'react';
import styles from './Form.css';
import axios from 'axios';
import {extendObservable} from 'mobx'
import {observer} from 'mobx-react';




export default observer (class Form extends React.Component  {
    constructor (props) {
        super (props);

        extendObservable(this, {
           login: '',
           password: '',
           classDefault: 'loginForm'
          
        })
    }
    SubmitTo = () => {
        let {login , password} = this;
        console.log(login);
        console.log(password);
        
    }

    onChange = e => {

        let {name, value} = e.target;
        this[name] = value;
    }

    Submit = async () => {
        this.classDefault = 'loginFormOnClick'

        let loginData = {
            username: this.login,
            password: this.password
        }
        try {
            let response = await axios.post('http://195.242.161.52:8888/login', loginData)
            let auth = response.data
            
            if (auth.Auth === 'Denied'){
                this.classDefault = 'loginFormDenied'
                
            } else
            if (auth.Auth  ===  "Logged") {
             this.classDefault = 'loginFormSuccess'
              
           }
           
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let {login, password,classDefault} = this;
        
        return (
            <div className={classDefault}>
                <div className="container">
                    <span>Login</span>
                    <div className="form-group">
                        <input type="login" name="login" onChange={this.onChange} value={login} className="form-control" id="InputLogin" placeholder="Login" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" onChange={this.onChange} value={password} className="form-control" id="InputPassword" placeholder="Password" />
                    </div>
                    <div className="button">
                        <button onClick={this.Submit} type="button" className="btn btn-info">login</button>
                    </div>
                </div>
                <div className="success">
                    <div className="image"><img src="https://www.jusco-easterntravels.com/images/Successful-icon.png" alt='success' /></div>
                    <div className="succesLogged">Succesfull logged</div>
                </div>
            </div>
        )
    }
})

                        
