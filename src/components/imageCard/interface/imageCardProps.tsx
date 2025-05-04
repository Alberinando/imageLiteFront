interface ImageCardProps {
    id?: string;
    url: string;
    name?: string;
    size?: number;
    dataUpload?: string;
    extension?: string;
    onDelete?: () => void;
}

export default ImageCardProps
