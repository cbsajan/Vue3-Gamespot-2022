import * as yup from 'yup';


const addArticleSchema = {
    game: yup.string()
        .required('The game is required'),
    title: yup.string()
        .required('The title is required')
        .min(20, 'Make the title bigger')
        .max(70, 'The title is too long'),
    excerpt: yup.string()
        .required('The excerpt is required')
        .min(100, 'Make the excerpt bigger')
        .max(320, 'The excerpt is too long'),
    editor: yup.string(),
    rating: yup.string(),


    img: yup.string()
        .url('Is this a valid url ? come one !!')
        .required('The Image Url is required')
}


export {
    addArticleSchema
}