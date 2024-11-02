export type Pagination = {
    limit: number
    offset: number
}

export type SortDir = 'asc' | 'desc'

export type Sorting = {
    sortCol: string
    sortDir: SortDir
}

export type PaginatedList<T> = {
    items: Array<T>
    total: number
}
