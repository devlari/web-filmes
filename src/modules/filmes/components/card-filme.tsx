import { Card } from 'primereact/card';
import { Filme } from '../types';
import Image from 'next/image';

type FilmeCardProps = {
  filme: Filme;
  onMoreInfo: (filmeId: number) => void;  
};

export function CardFilme({ filme, onMoreInfo }: FilmeCardProps) {
  const header = <Image alt={filme.tituloOriginal} src={filme.urlImagem ?? ""} width={100} height={300} />;

  return (
    <Card title={filme.tituloTraduzido} subTitle="" header={header} className="w-18rem m-2 shadow-3" onClick={() => onMoreInfo(filme.id)} style={{cursor: 'pointer'}}/> 
  );
}
