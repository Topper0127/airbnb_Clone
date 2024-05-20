"use client"
import Image from "next/image"

interface AvatarProps {
    src: string | null | undefined;
    height?: number;
    width?: number;
};

const Avatar: React.FC<AvatarProps> = ({
    src, height, width
}) => {
    return (
        <>
            <Image
                className="rounded-full"
                height={height}
                width={width}
                alt="Avatar"
                src={src || "/images/placeholder.jpg"}
            />
        </>
    )
}

export default Avatar;