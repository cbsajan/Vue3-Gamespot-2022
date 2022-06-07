import { msgSuccess, msgError } from '../../components/Tools/vuex';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, articles } from '../../firebase';
import router from '../../routes';


let articlesCol = collection(db, articles)


const articlesModule = {
    namespaced: true,
    state() {
        return {

        }
    },
    actions: {
        async addArticle({ commit, rootGetters }, payload) {
            try {
                const user = rootGetters['auth/getUserData'];
                const newArticle = doc(articlesCol);
                await setDoc(newArticle, {
                    timestamp: serverTimestamp(),
                    owner: {
                        uid: user.uid,
                        firstname: user.firstname,
                        lastname: user.lastname
                    },
                    ...payload
                });
                console.log("Coming *****")
                router.push({ name: 'admin_articles' })
                msgSuccess(commit, 'Congratulations')
            } catch (error) {
                console.log("Coming *****")
                msgError(commit);
                console.log(error)
            }
        }
    }
}

export default articlesModule;


// const obj = {
//     id:'1238635252',
//     owner:{
//         firstname:'Francis',
//         lastname:'Jones',
//         uid:'kjdbciue0998323'
//     },
//     game:'The last of us 2',
//     title:'Lorem ipsum dolor sit amet, consectetur',
//     rating:5,
//     timestamp:'01/01/01',
//     img:'http://placebeard.it/1080/720',
//     excerpt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
//     editor:'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>'
// }