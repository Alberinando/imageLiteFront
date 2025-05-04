import ImageResource from "@/resources/image/image.resource";
import {useAuth} from "@/resources/users/authentication.resourse";

class ImageServices {
    baseUrl: string = "http://192.168.1.6:8089/v1/images";
    auth = useAuth();

    async Search(query: string, extension: string) : Promise<ImageResource[]>{
        const userSession = this.auth.getUserSession();
        const url = `${this.baseUrl}?Query=${query}&Extension=${extension}`;
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async SaveImage(data: FormData) : Promise<string> {
        const userSession = this.auth.getUserSession();
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`,
            },
            body: data,
        });

        return response.headers.get('location') ?? '';
    }

    async DeleteImage(id: string) : Promise<void> {
        const userSession = this.auth.getUserSession();
        const url = `${this.baseUrl}/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`,
            }
        })

        if (response.status === 404) {
            throw new Error("Imagem não encontrada!!!");
        }

        if (!response.ok) {
            throw new Error("Erro ao excluir imagem");
        }
    }
}

export const useImageServices = () => new ImageServices();
