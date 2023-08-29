import Image from 'next/image'

export default function Home() {
    const imageStyle = {
        borderRadius: '40%'
    }
    return (
        <main className="flex items-center justify-center w-full min-h-screen ">
                <Image src={"/unicorn.png"} height={500} width={500} style={imageStyle} alt={'Unicorn'} />
        </main>
    )
}
