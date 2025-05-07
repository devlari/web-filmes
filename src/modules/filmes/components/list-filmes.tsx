import { Paginator } from 'primereact/paginator';
import { DataView } from 'primereact/dataview';
import { Filme, PaginationResponse } from '../types';
import { CardFilme } from './card-filme';
import { useRouter } from 'next/router';

type ListFilmesProps = {
    data: PaginationResponse<Filme[]>;
}

export function ListFilmes({ data }: ListFilmesProps) {
const { page, perPage, data: rows,totalPages } = data;
const router = useRouter();

const onMoreInfo = (id: number) => {
    router.push(`/filmes/${id}`);
};


const onPageChange = (e) => {
    const newPage = e.page + 1;
    router.push(`/filmes?page=${newPage}`);
};
return (
    <>
        <DataView value={rows} first={(page - 1) * perPage} layout='grid' itemTemplate={(item: Filme) => <CardFilme filme={item} onMoreInfo={onMoreInfo} />} />
        <Paginator rows={perPage} first={(page - 1) * perPage} totalRecords={perPage * totalPages} onPageChange={onPageChange} />
    </>
)

}