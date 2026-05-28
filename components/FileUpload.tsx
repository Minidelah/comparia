"use client";

import { useState, useRef } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
};

export default function FileUpload({ 
  onChange,
  accept,
  multiple = false,
  className,
  disabled = false,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
      if (onChange) onChange(e.target.files);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      setFiles(fileList);
      if (onChange) onChange(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onClick={() => !disabled && fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn("card-premium cursor-pointer text-center transition",
          isDragging ? "border-primary-500 bg-primary-500/10" : "",
          disabled ? "cursor-not-allowed opacity-60" : ""
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
            <BrandIcon name="upload" className="h-6 w-6" />
          </div>
        </div>

        <p className="text-sm text-neutral-400 mb-2">
          {isDragging ? "Relâchez pour déposer" : "Glissez-déposez des fichiers ou cliquez pour sélectionner"}
        </p>

        {accept && (
          <p className="text-xs text-neutral-500">
            Formats acceptés: {accept}
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-white mb-3">Fichiers sélectionnés</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between gap-3 rounded-lg bg-neutral-800/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/20 text-primary-300">
                    <BrandIcon name="file" className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-200 truncate">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-neutral-400 transition hover:bg-neutral-600"
                >
                  <BrandIcon name="x" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}