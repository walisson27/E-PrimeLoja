import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import VariantSelector from "../components/VariantSelector";
import CepChecker from "../components/CepChecker";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  variants: {
    sizes: string[];
    colors: string[];
  };
};

const ProdutoPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = Number(searchParams.get("id"));

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  // 🔄 Busca os produtos da API e encontra o pelo ID da URL
  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id === productId);
        setProduct(found || null);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, [productId]);

  // 🔁 Recupera seleção anterior do localStorage
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
      if (!mainImage && product.images.length > 0) {
        setMainImage(product.images[0]);
      }
    }
  }, [product]);

  // 💾 Salva seleção no localStorage
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

  if (!product) {
    return <p className="text-red-600">Produto não encontrado.</p>;
  }

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

export default ProdutoPage;
