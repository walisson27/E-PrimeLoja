
interface OrderProps {
  sortType: string;
  onSortChange: (value: string) => void;
}

const Order = ({ sortType, onSortChange }: OrderProps) => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <label className="mr-2 font-semibold" htmlFor="sort-select">
          Ordenar por:
        </label>
        <select
          id="sort-select"
          value={sortType}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="menorPreco">Menor Preço</option>
          <option value="maiorPreco">Maior Preço</option>
        </select>
      </div>
    </div>
  );
};

export default Order;
