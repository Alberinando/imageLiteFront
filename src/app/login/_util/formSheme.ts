import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().trim().matches(/^[A-Za-zÀ-ÖØ-öø-ÿ. ]+$/, 'Nome deve conter apenas letras.').required('Nome é obrigatório'),
    email: Yup.string().trim().required('Email é obrigatório').email('Email inválido'),
    password: Yup.string().trim().required('Senha é obrigatório').min(8, 'A senha precisa ter no mínimo 8 caracteres'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'As senhas tem que ser iguais')
})

export const formSchema = {name: '', email: '', password: '', passwordMatch: ''};

export default validationSchema;
