import ImageResource from "@/resources/image/image.resource";

class ImageServices {
    baseUrl: string = "http://192.168.1.13:8089/v1/images";

    async Search(query: string, extension: string) : Promise<ImageResource[]>{
        const url = `${this.baseUrl}?Query=${query}&Extension=${extension}`;
        const response = await fetch(url);
        return await response.json();
    }

    async SaveImage(data: FormData) : Promise<string> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: data,
        });

        return response.headers.get('location') ?? '';
    }
}

export const useImageServices = () => new ImageServices();
