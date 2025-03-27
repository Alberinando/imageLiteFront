export default class ImageResource {
    url: string;
    name?: string;
    extension?: string;
    size?: number;
    uploadDate?: string;

    constructor(url: string) {
        this.url = url;
    }
}
