import { useState } from "react";

import type { Product } from "../../contexts/ProductsContext";

type ProductGalleryProps = {
  product: Product;
};

type GalleryImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productImages: GalleryImage[] = [
    {
      id: "primary",
      imageUrl: product.imageUrl,
      sortOrder: -1,
    },
    ...(Array.isArray(product.images)
      ? product.images.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
          sortOrder: image.sortOrder,
        }))
      : []),
  ]
    .filter((image) => image.imageUrl.trim())
    .filter(
      (image, index, array) =>
        array.findIndex(
          (item) => item.imageUrl.trim() === image.imageUrl.trim(),
        ) === index,
    )
    .sort((a, b) => {
      if (a.id === "primary") {
        return -1;
      }

      if (b.id === "primary") {
        return 1;
      }

      return a.sortOrder - b.sortOrder;
    });

  const safeSelectedImageIndex =
    selectedImageIndex >= productImages.length ? 0 : selectedImageIndex;

  const selectedImage =
    productImages[safeSelectedImageIndex]?.imageUrl || product.imageUrl;

  return (
    <div className="bg-[#f7f9fc] p-6 md:p-8">
      <div className="flex min-h-[340px] items-center justify-center md:min-h-[470px]">
        <img
          src={selectedImage}
          alt={product.title}
          className="max-h-[420px] w-full object-contain"
        />
      </div>

      {productImages.length > 1 && (
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
            {productImages.map((image, index) => {
              const isSelected = index === safeSelectedImageIndex;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`Exibir imagem ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 bg-white p-2 transition ${
                    isSelected
                      ? "border-[#1769e0] shadow-[0_0_0_2px_rgba(23,105,224,0.12)]"
                      : "border-transparent hover:border-[#b9c9dc]"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={`${product.title} - imagem ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
