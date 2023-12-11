import Link from "next/link"
import ThemeButton from "./ThemeButton"

function Navbar() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-3'>
        <div className='flex justify-between h-16'>
            <div className='flex justify-between items-center w-full'>
                <Link href='/'>
                    <h1 className='text-5xl font-extrabold leading-9 tracking-tight textgray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14'>
                        Top <span className='text-teal-500'>Reads</span>
                    </h1>
                </Link>
                <ThemeButton />
            </div>
        </div>
    </div>
  )
}

export default Navbar


// text-3xl font-bold