import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI} from '../../../config/redux/action'

import './Dashboard.scss';

class Dashboard extends Component {
    //Membuat state awal untuk data yg dibutuhkan di halaman dashboard
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    //Setelah component dimunculkan maka melakukan penyimpanan data userData ke local machine
    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);
    }

    //Menyimpan data sesuai dengan input form yang di isi
    //Mengambil uid dari local machine yang telah disimpan
    //Membuat kondisi bila tombol bertuliskan 'SIMPAN,
    //Maka melakukan dispatch action saveNotes dengan mengirim data ke back-end dan pengosongan state awal
    //bila else, mengubah data.noteId menjadi noteId yang ada di state skrng
    //Kemudian Pemanggilan backend menggunakan data yang skrng, kemudian lakukan pengosongan state awal dan ganti nama tombol
    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes, updateNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if(textButton === 'SIMPAN') {
            saveNotes(data)
            .then(this.setState({
                title: '',
                content: '',
            }))
        }
        else {
            data.noteId = noteId;
            updateNotes(data)
            .then(this.setState({
                title: '',
                content: '',
                textButton: "SIMPAN"
            }))
        }
        console.log(data)
    }

    //Mengubah state awal sesuai dengan input form yang diketik dan menyesuaikan type nya
    onInputChange = (e, type) => {
        this.setState ({
            [type]: e.target.value
        })
    }

    //Mengubah state awal sesuai dengan input form yang diketik
    updateNotes = (note) => {
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: "UPDATE",
            noteId: note.id
        })
    }

    //Pengosongan state awal agar input form kosong, dan mengubah tulisan tombol
    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: "SIMPAN"
        })
    }

    //Mengambil data dari onclick yang dipilih, stopPropagation digunakan agar informasi state tdk muncul pada form stelah di klik
    //Mengambil uid dari userData yang disimpan di local machine
    //Mengirimkan data ke back-end seusai userId dan noteId yg dibutuhkan
    deleteNotes = (e, note) => {
        e.stopPropagation();
        const {deleteNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNotes(data);
    }

    //Membuat Form input untuk menambah notes atau mengedit notes
    //Melakukan pemanggilan note dari firebase dgn menggunakan perulangan di map 
    //Konversi timestamp ke date
    render() {
        const {title, content, textButton} = this.state;
        const {notes} = this.props;
        const {updateNotes, cancelUpdate, handleSaveNotes} = this;
        return(
            <div className="container">
                <p className="notes-title">SIMPLE NOTES WITH FIREBASE</p>
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')} />
                    <div className="action-wrapper">
                        <button className="save-btn" onClick={handleSaveNotes}>{textButton}</button>
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-btn cancel" onClick={cancelUpdate}>CANCEL</button>
                            ) : null
                        }
                    </div>
                </div>
                <hr/>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    const d = new Date( note.data.date );
                                    const newDate = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
                                    return (
                                        <div className="card-container" key={note.id}>
                                            <div className="card-content" onClick={() => updateNotes(note)}>
                                                <p className="title">{note.data.title}</p>
                                                <p className="date">{newDate}</p>
                                                <p className="content">{note.data.content}</p>
                                                <div className="delete-btn" onClick={(e) => this.deleteNotes(e, note)}>X</div>
                                            </div>
                                        </div>
                                        
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

//Pemanggilan state global redux
const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

//Pemanggilan dispatch global redux
const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    getNotes : (data) => dispatch(getDataFromAPI(data)),
    updateNotes : (data) => dispatch(updateDataAPI(data)),
    deleteNotes : (data) => dispatch(deleteDataAPI(data))
})

//export class dengan menggunakan react-redux connect
export default connect(reduxState, reduxDispatch)(Dashboard);