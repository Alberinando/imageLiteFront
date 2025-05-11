export default class ImageResource {
    url: string;
    name?: string;
    extension?: string;
    size?: number;
    uploadDate?: string;
    id?: string;

    constructor(url: string) {
        this.url = url;
    }
}

export interface ImageEditResource {
    id?: string;
    name?: string;
    tags?: string;
    fileBase64?: string;
}
