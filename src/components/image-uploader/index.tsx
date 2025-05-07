import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { handleUploadImage } from '@/services/upload-image';
import { parseCookies } from 'nookies';

interface ImageUploadProps {
    onImageUploaded: (url: string) => void;
    onUploadCancelled?: () => void;
    initialImageUrl?: string;
}

export function ImageUploader({ onImageUploaded, onUploadCancelled, initialImageUrl }: ImageUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('Nenhum arquivo selecionado para upload.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('imagem', selectedFile, selectedFile.name);

        const cookies = parseCookies();
        const token = cookies["token"];

        console.log(token);

        try {
            const response = await handleUploadImage(token ?? '', formData);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro durante o upload:', errorData);
                return;
            }

            const responseData = await response.json();
            if (responseData && responseData.url) {
                onImageUploaded(responseData.url);
                setSelectedFile(null);
                setPreviewUrl(responseData.url); 
            } else {
                console.error('Erro: URL da imagem não retornada pelo servidor.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição de upload:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setPreviewUrl(initialImageUrl || null);
        if (onUploadCancelled) {
            onUploadCancelled();
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClickFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            {previewUrl && (
                <div className="mb-2">
                    <Image src={previewUrl} alt="Prévia da Imagem" width={200} height={200} style={{ objectFit: 'cover' }} />
                </div>
            )}

            {!previewUrl && (
                <button
                    type="button"
                    onClick={handleClickFileInput}
                    disabled={isUploading}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Selecionar Imagem
                </button>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                disabled={isUploading}
            />

            {selectedFile && !isUploading && (
                <div className="mt-2 space-x-2">
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Enviando...' : 'Enviar Imagem'}
                    </button>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Remover
                    </button>
                </div>
            )}

            {previewUrl && !selectedFile && (
                <button
                    type="button"
                    onClick={handleRemove}
                    className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Remover
                </button>
            )}
        </div>
    );
}