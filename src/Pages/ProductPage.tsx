import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import VariantSelector from "../components/VariantSelector";
import CepChecker from "../components/CepChecker";
import { productData } from "../productData";

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = Number(searchParams.get("id"));

  const product = productData.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      const saved = localStorage.getItem(`product-selection-${product.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          setSelectedSize(parsed.size);
          setSelectedColor(parsed.color);
          setMainImage(parsed.image);
        }
      }
      if (!mainImage) {
        setMainImage(product.images[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product && mainImage) {
      localStorage.setItem(
        `product-selection-${product.id}`,
        JSON.stringify({
          size: selectedSize,
          color: selectedColor,
          image: mainImage,
          timestamp: Date.now(),
        })
      );
    }
  }, [selectedSize, selectedColor, mainImage]);

  if (!product) return <p className="text-red-600">Produto não encontrado.</p>;

  return (
    <main className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      <ImageGallery
        images={product.images}
        mainImage={mainImage || product.images[0]}
        setMainImage={setMainImage}
      />

      <section className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-2xl text-green-600 font-semibold">
          R$ {product.price.toFixed(2)}
        </p>

        <VariantSelector
          label="Tamanho"
          options={product.variants.sizes}
          selected={selectedSize}
          onChange={setSelectedSize}
        />

        <VariantSelector
          label="Cor"
          options={product.variants.colors}
          selected={selectedColor}
          onChange={setSelectedColor}
        />

        <CepChecker />
      </section>
    </main>
  );
};

export default ProductPage;
