
const msgSuccess = (commit, msg = 'Thank you!!') => {
    return commit('notify/setToastMsg', {
        msg: msg,
        type: 'success'
    }, { root: true });
}

const msgError = (commit) => {
    const errorMessage = ['Ops,try again later', 'Something Went Wrong', 'Sorry,There Is Some Problem']
    const random = Math.floor(Math.random() * errorMessage.length);
    return commit('notify/setToastMsg', {
        msg: errorMessage[random],
        type: 'error'
    }, { root: true });
}

export {
    msgError,
    msgSuccess
}
