/* eslint-disable */
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { msgError, msgSuccess } from '../../components/Tools/vuex.js'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import router from '../../routes'
import { db, auth, users } from '../../firebase';


const DEFAULT_USER = {
    uid: null,
    email: null,
    firstname: null,
    lastname: null,
    isAdmin: null
}


const authModule = {
    namespaced: true,
    state() {
        return {
            user: DEFAULT_USER,
            auth: false
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = {
                ...state.user,
                ...payload
            }
            state.auth = true;
        }
    },
    actions: {
        async getUserProfile({ commit }, payload) {
            try {
                const docSnap = await getDoc(doc(db, users, payload))
                console.log(docSnap.data())
                if (docSnap.exists()) {
                    return docSnap.data()
                } else {
                    return null
                }
            } catch (error) {
                console.log(error)
            }
        },
        async signin({ commit, dispatch }, payload) {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    payload.email,
                    payload.password
                )
                const UserData = await dispatch('getUserProfile', userCredential.user.uid)
                console.log(userCredential)
                commit('setUser', UserData)
                const email = userCredential.user.email
                var name = (email.substring(0, email.lastIndexOf("@"))).replace(/\b\w/g, l => l.toUpperCase());
                msgSuccess(commit, `Welcome ${name} !!`)
                router.push('/user/dashboard')
            } catch (error) {
                console.error(error);
                msgError(commit)
            }
        },
        async signup({ commit }, payload) {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    payload.email,
                    payload.password
                );

                console.log(userCredential)

                const newUser = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    isAdmin: false,
                }
                console.log(newUser)
                await setDoc(doc(db, users, newUser.uid), newUser)
                commit('setUser', newUser)
                const email = userCredential.user.email
                var name = (email.substring(0, email.lastIndexOf("@"))).replace(/\b\w/g, l => l.toUpperCase());
                msgSuccess(commit, `Welcome ${name} !!`)
                router.push('/user/dashboard')

            } catch (error) {
                msgError(commit)
            }
        }
    }
}

export default authModule; 