export default interface RequestMeta {
    pagination: {
        total: number,
        pages: number,
        page: number,
        limit: number,
        links: {
            previous: string | null,
            current: string,
            next: string | null,
        }
    }
}