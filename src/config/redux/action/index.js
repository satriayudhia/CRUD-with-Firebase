import firebase, {database} from '../../firebase'

export const actionUsername = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: 'CHANGE_USER', value: 'SATRIA YUDHIA'})
    }, 2000);
}

//Back-end ke firebase untuk register user baru
export const registerUserAPI = (data) => (dispatch) => {

    return new Promise ((resolve, reject) => {
        dispatch ({type: 'CHANGE_LOADING', value: true});
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                console.log('Akun Berhasil Dibuat:', res);
                dispatch ({type: 'CHANGE_LOADING', value: false});
                resolve(true);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch ({type: 'CHANGE_LOADING', value: false});
                reject(false);
              })
    })
}

//Back-end ke firebase untuk login existing user
export const loginUserAPI = (data) => (dispatch) => {

    return new Promise ((resolve, reject) => {
        dispatch ({type: 'CHANGE_LOADING', value: true});
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    emailVerified: res.user.emailVerified,
                    refreshToken: res.user.refreshToken
                }
                dispatch ({type: 'CHANGE_LOADING', value: false});
                dispatch ({type: 'CHANGE_ISLOADING', value: true});
                dispatch ({type: 'CHANGE_USER', value: dataUser});
                resolve(dataUser);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch ({type: 'CHANGE_LOADING', value: false});
                dispatch ({type: 'CHANGE_ISLOADING', value: false});
                reject(false);
              })
    })
    
}

//Back-end ke firebase untuk menambah data 'POST'
export const addDataToAPI = (data) => (dispatch) => {

    return new Promise ((resolve, reject) => {
        database.ref('notes/' + data.userId).push({
            title: data.title,
            content: data.content,
            date: data.date
        })
        resolve(true);
    })
}

//Back-end untuk mengambil data dari firebase 'GET'
export const getDataFromAPI = (userId) => (dispatch) => {
    
    const urlNotes = database.ref('notes/' + userId);
    return new Promise ((resolve, reject) => {
        urlNotes.on('value', function(snapshot) {
            console.log('isi snapshot: ', snapshot.val());
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            });

            dispatch({type: 'SET_NOTES', value: data});
            resolve(snapshot.val());
        });
    })
}

//Back-end untuk mengubah data dari firebase 'PUT'
export const updateDataAPI = (data) => (dispatch) => {
    
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise ((resolve, reject) => {
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if(err) {
                reject(false);
            }
            else {
                resolve(true);
            }
        })
    })
}

//Back-end untuk menghapus data dari firebase 'DELETE'
export const deleteDataAPI = (data) => (dispatch) => {
    
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise ((resolve, reject) => {
        urlNotes.remove()
    })
}