import Link from "next/link";

export default function Header(){

    return (
        <div className="bg-gray-400 text-white p-4">
            <Link href='/'>
                <h1 className="text-xl w-24">Todos</h1>
            </Link>
        </div>
    )
}