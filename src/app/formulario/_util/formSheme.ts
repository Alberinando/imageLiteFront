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
            (file: Blob) => file.size < (20 * 1024 * 1024)
        )
        .test(
            'type',
            'Formato aceitos: PNG, JPEG, GIF, BMP, TIFF, WEBP',
            (file: Blob) => file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/tiff' || file.type === 'image/webp',
        )
})

export const formUpdateValidationSchema = YUP.object().shape({
    name: YUP.string().trim().required("Nome obrigatório").max(50, "Limite de 50 caracteres atingido"),
    tags: YUP.string().trim().required("Tags obrigatório").max(50, "Limite de 50 caracteres atingido"),
    file: YUP.mixed<Blob>()
        .test(
            "file-changed",
            "O arquivo deve ser uma imagem válida",
            (value) => {
                if (!value || typeof value === "string") return true;
                return (
                    value.size < 4 * 1024 * 1024 &&
                    (value.type === "image/jpeg" ||
                        value.type === "image/jng" ||
                        value.type === "image/png" ||
                        value.type === "image/gif" ||
                        value.type === "image/bmp" ||
                        value.type === "image/tiff" ||
                        value.type === "image/webp")
                );
            }
        )
});


export default formSheme;
