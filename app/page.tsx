import Link from "next/link"
import { Post } from "./lib/interface"
import { client } from "./lib/sanity"

async function getData() {
  const query = `*[_type == "post"] | order(_createdAt desc) [0...50]`

  const data = await client.fetch(query)

  return data
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function IndexPage() {
  const data = (await getData()) as Post[]
  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight textgray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'
        ></h1>
      </div>
      <div className='h-[2000px] overflow-hidden overflow-y-scroll no-scrollbar'>
        <ul>
          {data.map((post) => (
            <li key={post._id} className='py-4'>
              <article className='space-y-2 xl:grid xl:grid-cols-6 xl:items-baseline xl:space-y-0'>
                <div>
                  <p className='text-base font-medium leading-6 text-teal-500'>
                    {new Date(post._createdAt).toISOString().split('T')[0]}
                  </p>
                </div>

                <Link 
                  href={post.url}
                  className='space-y-3 xl:col-span-5'
                >
                  <div className='flex justify-between'>
                    <div>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100'>
                        {post.title}
                      </h3>
                    </div>
                    <div>
                      <div className='text-teal-500 mt-1'>
                        {post.author} <span className='text-gray-500 dark:text-gray-400'>in {post.publication}</span>
                      </div>
                    </div>
                  </div>
                  <p className='prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-6'>
                    {post.content}
                  </p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <hr className='divide-gray-200 dark:divide-gray-700 mt-1' />
    </div>
  )
}
