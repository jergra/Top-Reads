export interface Post {
    title: string
    url: string
    content: any
    _id: string
    slug: {
        current: string
    }
    _createdAt: string
}