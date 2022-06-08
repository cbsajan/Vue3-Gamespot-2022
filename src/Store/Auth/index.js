/* eslint-disable */
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { msgError, msgSuccess } from '../../components/Tools/vuex.js'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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
    getters: {
        isAuth(state) {
            if (state.auth) { return true };
            return false
        },
        isAdmin(state) {
            if (state.user.isAdmin) { return true };
            return false
        },
        getUserData(state) {
            return state.user;
        },
        getUserId(state) {
            return state.user.uid
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = {
                ...state.user,
                ...payload
            }
            state.auth = true;
        },
        clearUser(state) {
            state.user = DEFAULT_USER
            state.auth = false
        }
    },
    actions: {
        async updateProfile({ commit, getters }, payload) {
            try {
                const UserRef = doc(db, users, getters.getUserId)
                const userData = getters.getUserData;
                if (
                    payload.firstname === userData.firstname &&
                    payload.lastname === userData.lastname
                ) {
                    msgError(commit, 'They are the same !!!')
                    return false
                }
                await updateDoc(userRef, {
                    ...payload
                });

                commit('setUser', payload);
                msgSuccess(commit, 'Updated');
            } catch (error) {
                msgError(commit, error)
            }
        },
        async signOut({ commit }) {
            try {
                await auth.signOut()
                commit('clearUser')
                router.push('/')
                msgSuccess(commit, 'Logged out Successfully')
            } catch (error) {
                msgError(commit)
            }
        },
        async autosign({ commit, dispatch }, payload) {
            try {
                const userData = await dispatch('getUserProfile', payload.uid);
                commit('setUser', userData);
                return true;
            } catch (error) {
                msgError(commit);
                console.log(error)
            }
        },
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
                commit('notify/setLoading', true, { root: true })
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
            } finally {
                commit('notify/setLoading', false, { root: true })
            }
        },
        async signup({ commit }, payload) {
            try {
                commit('notify/setLoading', true, { root: true })
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
            } finally {
                commit('notify/setLoading', false, { root: true })
            }
        }
    }
}

export default authModule; 