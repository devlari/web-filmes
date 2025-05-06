export type Filme = {
    id: number
    usuarioId: number
    tituloOriginal: string
    tituloTraduzido: string
    descricao: string
    sinopse?: string
    orcamento?: number
    dtLancamento: string | Date
    urlImagem?: string
    duracao?: number
    receita?: number
    lucro?: number
    linkTrailer?: string
}

export type FilmePostPayload = {
    tituloOriginal: string
    tituloTraduzido: string
    descricao: string
    orcamento?: number
    dtLancamento: string | Date
    urlImagem?: string
    duracao?: number
    receita?: number
    lucro?: number
    linkTrailer?: string
}

export type FilmePatchPayload = Partial<FilmePostPayload>

export type PaginationResponse<T> = {
    page: number
    perPage: number
    totalPages: number
    data: T[]
}