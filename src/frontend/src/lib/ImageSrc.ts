export function ImageSrc(src?: string, username?: string) {
    if (src)
        return src;
    return `https://placehold.co/600x600/FF3D00/fff?text=${username?.toUpperCase().substring(0, 2)}`
}