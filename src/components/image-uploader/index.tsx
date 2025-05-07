/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import ApiClient from '@/services/http-client';
import Image from 'next/image';

interface ImageUploadProps {
    onImageUploaded: (url: string) => void; 
    onUploadCancelled?: () => void;      
    initialImageUrl?: string;          
}

export function ImageUploader({ onImageUploaded, onUploadCancelled, initialImageUrl }: ImageUploadProps) {
    const [, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileUploadRef = useRef<FileUpload>(null);

    useEffect(() => {
        if (initialImageUrl) {
            setUploadedFile(null);
        }
    }, [initialImageUrl]);

    const onUpload = async (event: any) => {
        if (event.files && event.files.length > 0) {
            const file = event.files[0];
            setUploadedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            setIsUploading(true);

            const formData = new FormData();
            formData.append('imagem', file, file.name); 

            const apiClient = new ApiClient();
            try {
                console.log(formData);

                const response = await apiClient.postFormData('/filmes/upload', formData);

                console.log(response);

                if (response.data && response.data.url) {
                    onImageUploaded(response.data.url);
                } else {
                    console.error('Erro: URL da imagem não retornada pelo servidor.');
                }
            } catch (error: any) {
                console.error('Erro durante o upload da imagem:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const onRemove = () => {
        setUploadedFile(null);
        setPreviewUrl(null);
        setIsUploading(false);

        if (initialImageUrl && onUploadCancelled) {
            onUploadCancelled();
        }
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-camera',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-info mr-2',
    };

    return (
        <div>
            {previewUrl && (
                <div className="mb-2">
                    <Image src={previewUrl} alt="Prévia da Imagem" width={200} height={200} />
                </div>
            )}

            {!previewUrl && (
                <FileUpload
                    ref={fileUploadRef}
                    mode="basic"
                    accept="image/*"
                    maxFileSize={5 * 1000 * 1000} 
                    onUpload={onUpload}
                    chooseOptions={chooseOptions}
                    onRemove={onRemove}
                    disabled={isUploading}
                />
            )}

            {previewUrl && !isUploading && (
                <Button label="Remover" icon="pi pi-trash" className="p-button-danger" onClick={onRemove} />
            )}
        </div>
    );
}