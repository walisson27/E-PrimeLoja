import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ShieldCheck, ShoppingBag, Truck } from "../components/Icons";
import ImageGallery from "../components/ImageGallery";
import VariantSelector from "../components/VariantSelector";
import CepChecker from "../components/CepChecker";
import { productData } from "../productData";
import { addProductToCart } from "../utils/cartStorage";
import type { CartItem } from "../utils/cartStorage";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  variants?: {
    sizes: string[];
    colors: string[];
  };
};

type ProdutoPageProps = {
  setCart: Dispatch<SetStateAction<CartItem[]>>;
};

const API_URL = "https://loja-teste-1.onrender.com/produtos";

const ProdutoPage = ({ setCart }: ProdutoPageProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = Number(searchParams.get("id"));

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erro na API");
        const data: Product[] = await res.json();
        const found = data.find((p) => p.id === productId) || productData.find((p) => p.id === productId);
        setProduct(found || null);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setProduct(productData.find((p) => p.id === productId) || null);
      } finally {
        setLoading(false);
      }
    };

    carregarProduto();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    setCart((prev) => addProductToCart(prev, product));
    setAddedMessage(true);
    window.setTimeout(() => setAddedMessage(false), 1800);
  };

  if (loading) {
    return (
      <div className="eprime-container py-10">
        <div className="surface-card flex min-h-[420px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="eprime-container py-10">
        <div className="surface-card p-8 text-center">
          <p className="text-lg font-bold text-slate-900">Produto não encontrado.</p>
          <Link to="/" className="primary-btn mt-5 px-5 py-3">Voltar para loja</Link>
        </div>
      </div>
    );
  }

  const variants = product.variants || { sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco", "Azul"] };

  return (
    <main className="eprime-container py-8 md:py-10">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700">
        <ArrowLeft size={17} /> Voltar ao catálogo
      </Link>

      <section className="surface-card grid gap-8 p-5 md:grid-cols-2 md:p-8 lg:gap-12">
        <ImageGallery images={product.images} mainImage={mainImage || product.images[0]} setMainImage={setMainImage} />

        <div className="flex flex-col gap-7">
          <div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">Produto premium</span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{product.title}</h1>
            <p className="mt-4 text-4xl font-black text-slate-950">R$ {product.price.toFixed(2)}</p>
            <p className="mt-1 text-sm text-slate-500">Pagamento seguro em até 10x sem juros</p>
          </div>

          <VariantSelector label="Tamanho" options={variants.sizes} selected={selectedSize} onChange={setSelectedSize} />
          <VariantSelector label="Cor" options={variants.colors} selected={selectedColor} onChange={setSelectedColor} />

          <button onClick={handleAddToCart} className="primary-btn w-full px-5 py-4 text-base sm:w-fit">
            <ShoppingBag size={19} /> Adicionar ao carrinho
          </button>
          {addedMessage && (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Produto adicionado ao carrinho.
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Truck className="mb-2 text-blue-600" size={22} />
              <p className="font-bold text-slate-900">Entrega rápida</p>
              <p className="text-sm text-slate-500">Consulte o frete pelo CEP.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <ShieldCheck className="mb-2 text-blue-600" size={22} />
              <p className="font-bold text-slate-900">Compra segura</p>
              <p className="text-sm text-slate-500">Ambiente protegido.</p>
            </div>
          </div>

          <CepChecker />
        </div>
      </section>
    </main>
  );
};

export default ProdutoPage;
