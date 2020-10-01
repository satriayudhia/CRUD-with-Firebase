import React, {Component} from 'react';
import Button from '../../../components/atoms/Button';
import {connect} from 'react-redux';
import './Register.scss'
import { registerUserAPI } from '../../../config/redux/action';

class Register extends Component {
    //Membuat state awal untuk data yg dibutuhkan di halaman register
    state = {
        email: '',
        password: ''
    }

    //Mengubah state awal sesuai dengan input form yang diketik
    handleChangeText = (e) => {
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //Mengambil data di dalam form input dan mengirim nya ke back-end di redux-action. 
    //Menunggu data kembali dari back-end
    //Menangkap error di err, membuat kondisi bila res (dari back-end) bernilai true,
    //Maka mengubah state awal menjadi kosong dan memunculkan alert
    handleRegisterSubmit = async () => {
        const {email, password} = this.state;
        console.log('data before send:', email, password);
        const res = await this.props.registerAPI({email, password})
        .catch(err => err);
        if(res) {
            this.setState ({
                email: '',
                password: ''
            })
            alert("Akun sudah berhasi dibuat, silahkan masuk ke halaman login")
        } 
    }

    //Mengalihkan tombol klik register ke path ./ login
    handleLoginSubmit = () => {
        const {history} = this.props;
        history.push('./');
    }

    //Membuat form input email, password dengan menggunakan onChange agar setiap value yg diketik dapat mengubah state awal dgn fungsi handleChangeText
    //Membuat fungsi onclick pada button agar mengarahkan ke page yang dituju
    render() {
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" placeholder="Email" id="email" type="text" onChange={this.handleChangeText} value={this.state.email}/>
                    <input className="input" placeholder="Password" id="password" type="password" onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleRegisterSubmit} title="register" loading={this.props.isLoading}/>
                    <p className="register-login" onClick={this.handleLoginSubmit}>LOGIN</p>
                </div>
                
            </div>
        )
    }
}

//Pemanggilan state global redux
const reduxState = (state) => ({
    isLoading: state.isLoading
})

//Pemanggilan dispatch global redux
const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

//export class dengan menggunakan react-redux connect
export default connect(reduxState, reduxDispatch)(Register);