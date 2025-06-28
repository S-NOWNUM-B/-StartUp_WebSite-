'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const defaultPlaceholder = (
    <div className="lazy-image-placeholder">
      <ImageIcon className="w-8 h-8" />
      <span>Загрузка...</span>
    </div>
  );

  const errorPlaceholder = (
    <div className="lazy-image-error">
      <AlertCircle className="w-8 h-8" />
      <span>Ошибка загрузки</span>
    </div>
  );

  return (
    <div 
      ref={ref}
      className={`lazy-image-container ${className}`}
      style={{ width, height }}
    >
      {!inView ? (
        <div className="lazy-image-skeleton">
          {placeholder || defaultPlaceholder}
        </div>
      ) : (
        <>
          {/* Основное изображение */}
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 1.1
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              display: hasError ? 'none' : 'block'
            }}
          />

          {/* Плейсхолдер во время загрузки */}
          {isLoading && !hasError && (
            <motion.div
              className="lazy-image-skeleton"
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {placeholder || defaultPlaceholder}
            </motion.div>
          )}

          {/* Ошибка загрузки */}
          {hasError && (
            <motion.div
              className="lazy-image-skeleton error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {errorPlaceholder}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
} 