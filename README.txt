Dec 10, 2023

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
    make changes to sanity/schemas/post.ts 
    cd sanity
    npm run dev
    npm run deploy

to revert the project to its original form, use the code in:
    app/lib/interfaceORIGINAL.ts
    app/pageORIGINAL.tsx
    sanity/postORIGINAL.ts



