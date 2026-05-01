type Props = {
  images: string[];
  mainImage: string;
  setMainImage: (image: string) => void;
};

const ImageGallery = ({ images, mainImage, setMainImage }: Props) => {
  if (!images || images.length === 0) {
    return <p className="rounded-2xl bg-slate-100 p-6 text-center text-slate-500">Nenhuma imagem disponível.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
        <img src={mainImage} alt="Imagem principal do produto" className="h-[320px] w-full object-contain p-4 sm:h-[430px]" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`shrink-0 overflow-hidden rounded-2xl border-2 bg-white p-1 transition ${
              mainImage === img ? "border-blue-600 shadow-lg shadow-blue-600/15" : "border-transparent hover:border-slate-300"
            }`}
          >
            <img src={img} alt={`Miniatura ${idx + 1}`} className="h-20 w-20 rounded-xl object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
