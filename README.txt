Dec 10, 2023

dev/topreads

modified from tutorial:
    Build and Deploy a Blog with Next.js 13 | React, Tailwind.css, Sanity.io | Tutorial 2023
    https://www.youtube.com/watch?v=MqmzrQ1MNG8&t=25s

    by Jan Marshal

This is a website which provides reading material selected 
from other websites.

deployed:
    https://top-reads.vercel.app

to change database content, go to:
    https://topreads.sanity.studio

to change the structure of the database:
    make changes to sanity/schemas/post.ts and app/lib/interface.ts
    cd sanity
    npm run dev
    npm run deploy




to revert the project to its original form, use the code in:
    app/lib/interfaceORIGINAL.ts
    app/pageORIGINAL.tsx
    sanity/postORIGINAL.ts

    create folder 'app/post/[slug]' containing 'page.tsx':

import { Post } from "@/app/lib/interface"
import { client } from "@/app/lib/sanity"
import { urlFor } from "@/app/lib/sanityImageUrl"
import { PortableText } from "@portabletext/react"
import Image from "next/image"

async function getData(slug: string) {
    const query = `*[_type == "post" && slug.current == "${slug}"][0]`
  
    const data = await client.fetch(query)
    
    return data
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function SlugPage({
    params
}: {params: {slug: string}
}) {
    const data = (await getData(params.slug)) as Post

    const PortableTextComponent = {
        types: {
            image: ({value}: {value: any}) => (
                <Image 
                    src={urlFor(value).url()} 
                    alt="Image" 
                    className='rounded-lg' 
                    width={800} 
                    height={800} 
                />
            )
        }
    }

    return (
        <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
            <header className='pt-6 xl:pb-6'>
                <div className='space-y-2 text-center'>
                    <div className='space-y-10'>
                        <div>
                            <p className='text-base font-medium leading-5 text-teal-500'>
                                {new Date(data._createdAt).toISOString().split("T")[0]}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                            {data.title}
                        </h1>
                    </div>
                </div>
            </header>

            <div className='divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0'>
                <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
                    <div className='prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg'>
                        <PortableText 
                            value={data.content} 
                            components={PortableTextComponent} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

