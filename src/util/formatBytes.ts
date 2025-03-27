function formatBytes(bytes: number = 0, decimals: number = 2) {
    if(!+bytes) return '0 bytes';

    const k:number = 1024;
    const dm:number = decimals < 0 ? 0 : decimals;
    const size:string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i:number = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${size[i]}`;
}

export default formatBytes;
