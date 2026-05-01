import { useState } from "react";
import { MapPin } from "./Icons";

type Address = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

const CepChecker = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCepSearch = async () => {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length !== 8) {
      setError("CEP deve conter 8 dígitos.");
      setAddress(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        setAddress(null);
      } else {
        setAddress(data);
        setError("");
      }
    } catch (err) {
      setError("Erro ao buscar o CEP.");
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4">
      <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
        <MapPin size={17} className="text-blue-600" /> Consultar frete
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite seu CEP"
          className="soft-input min-w-0 flex-1 px-4 py-3"
        />
        <button onClick={handleCepSearch} className="primary-btn px-5 py-3" disabled={loading}>
          {loading ? "Buscando..." : "Consultar"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      {address && (
        <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p><strong>CEP:</strong> {address.cep}</p>
          <p><strong>Endereço:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade} - {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default CepChecker;
