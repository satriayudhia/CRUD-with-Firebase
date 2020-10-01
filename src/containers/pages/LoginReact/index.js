import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUserAPI} from '../../../config/redux/action'
import Button from '../../../components/atoms/Button'

class LoginReact extends Component {
    //Membuat state awal untuk data yg dibutuhkan di halaman login
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
    //Maka lakukan penyimpanan userData yang diubah format ke dalam string dimasukkan ke local machine.
    //Kemudian mengubah state awal menjadi kosong dan dialihkan ke path ./dashboard
    //Bila gagal login akan muncul alert peringatan.
    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password})
        .catch(err => err);
        if(res) {
            localStorage.setItem('userData', JSON.stringify(res));
            this.setState ({
                email: '',
                password: ''
            })
            history.push('./dashboard');
        }
        else {
            alert('Email atau Password yang anda masukkan salah, coba lagi');
            console.log("Login Failed");
        }
    }

    //Mengalihkan tombol klik register ke path ./register
    handleRegisterSubmit = () => {
        const {history} = this.props;
        history.push('./register');
    }

    //Membuat form input email, password dengan menggunakan onChange agar setiap value yg diketik dapat mengubah state awal dgn fungsi handleChangeText
    //Membuat fungsi onclick pada button agar mengarahkan ke page yang dituju
    render() {
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" placeholder="Email" id="email" type="text" onChange={this.handleChangeText} value={this.state.email}/>
                    <input className="input" placeholder="Password" id="password" type="password" onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleLoginSubmit} title="login" loading={this.props.isLoading}/>
                    <p className="register-login" onClick={this.handleRegisterSubmit}>REGISTER</p>
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
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

//export class dengan menggunakan react-redux connect
export default connect(reduxState, reduxDispatch)(LoginReact);