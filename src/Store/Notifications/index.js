const NotificationsModule = {
    namespaced: true,
    state() {

        return {
            toasterMsg: [false, '', ''] // boolean  - Message - Type [error,success] 
        }

    },
    getters: {
        getToastMsg(state) {
            return state.toasterMsg
        }

    },
    mutations: {
        setToastMsg(state, payload) {
            state.toasterMsg = [true, payload.msg, payload.type]

        }

    }
}
export default NotificationsModule  