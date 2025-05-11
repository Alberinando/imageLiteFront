import * as YUP from "yup";

import IFormularioProps from "@/app/formulario/_interface/FormularioProps";

const formSheme: IFormularioProps = {
    name: '',
    tags: '',
    file: ''
}

export const formValidationSheme = YUP.object().shape({
    name: YUP.string().trim().required("Nome obrigatório").max(50, 'Limite de 50 caracteres atingido'),
    tags: YUP.string().trim().required('Tags obrigatório').max(50, 'Limite de 50 caracteres atingido'),
    file: YUP.mixed<Blob>()
        .required('Imagem obrigatória')
        .test(
            'size',
            'Não pode ser maior do que 20MB',
            (file: Blob) => file.size < 4000000
        )
        .test(
            'type',
            'Formato aceitos: PNG, JPEG, GIF, BMP, TIFF, WEBP',
            (file: Blob) => file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/tiff' || file.type === 'image/webp',
        )
})

export default formSheme;
