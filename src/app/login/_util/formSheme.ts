import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ. ]+$/, 'Nome deve conter apenas letras.')
        .required('Nome é obrigatório'),
    email: Yup
        .string()
        .trim()
        .required('Email é obrigatório')
        .email('Email inválido'),
    password: Yup
        .string()
        .trim()
        .required('Senha é obrigatória')
        .min(8, 'A senha precisa ter no mínimo 8 caracteres'),
    passwordMatch: Yup
        .string()
        .oneOf([Yup.ref('password')], 'As senhas têm que ser iguais')
        .required('Confirmação de senha é obrigatória'),
});

export const loginSchema = Yup.object().shape({
    email: Yup
        .string()
        .trim()
        .required('Email é obrigatório')
        .email('Email inválido'),
    password: Yup
        .string()
        .trim()
        .required('Senha é obrigatória'),
});

export const registerFormSchema = { name: "", email: "", password: "", passwordMatch: ""};
export const loginFormSchema    = { name: "", email: "", password: "", passwordMatch: "" };
