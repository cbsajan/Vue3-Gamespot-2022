const NotificationsModule = {
    namespaced: true,
    state() {

        return {
            loader: false,
            toasterMsg: [false, '', ''] // boolean  - Message - Type [error,success] 
        }

    },
    getters: {
        getToastMsg(state) {
            return state.toasterMsg
        },
        isLoading(state) {
            return state.loader
        }

    },
    mutations: {
        setToastMsg(state, payload) {
            state.toasterMsg = [true, payload.msg, payload.type]

        },
        setLoading(state, payload) {
            state.loader = payload
        }

    }
}
export default NotificationsModule  