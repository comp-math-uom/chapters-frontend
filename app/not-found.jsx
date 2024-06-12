import img from "../public/img/404.svg";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col justify-center">
            <Image className="m-auto" src={img} alt="Page Not Found" />
        </div>
    )
}