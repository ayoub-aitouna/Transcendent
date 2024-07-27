export function ImageSrc(src: string | undefined, username: string | undefined): string {
    if (src) {
        return src;
    }
    const safeUsername = username?.toUpperCase().substring(0, 2) || 'Loading';
    return `https://placehold.co/600x600/FF3D00/fff?text=${safeUsername}`;
}