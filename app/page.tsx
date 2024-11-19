import Link from "next/link";

export default function Home() {
	return (
		<div
			className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<h1 className={"text-4xl font-bold"}>React 19 Workshop</h1>
			<div><Link href={"/client"} className={"underline cursor-pointer text-2xl hover:font-bold text-blue-700"}>Client
				Examples</Link>
			</div>
			<div><Link href={"/books"} className={"underline cursor-pointer text-2xl  hover:font-bold  text-blue-700"}>Server/Fullstack
				Examples</Link></div>
		</div>
	);
}
