interface OrderProps {
  sortType: string;
  onSortChange: (value: string) => void;
}

const Order = ({ sortType, onSortChange }: OrderProps) => {
  return (
    <select
      id="sort-select"
      value={sortType}
      onChange={(e) => onSortChange(e.target.value)}
      className="soft-input w-full px-4 py-3 text-sm font-medium text-slate-700 sm:w-44"
      aria-label="Ordenar produtos"
    >
      <option value="az">A - Z</option>
      <option value="za">Z - A</option>
      <option value="menorPreco">Menor preço</option>
      <option value="maiorPreco">Maior preço</option>
    </select>
  );
};

export default Order;
