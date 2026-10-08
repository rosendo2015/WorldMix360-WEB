import {
  isProductSortOption,
  isProductStatusOption,
  type ProductSortOption,
  type ProductStatusOption,
} from "./productListOptions";
import { FormSelect } from "../../FormControls";

type AdminProductListControlsProps = {
  visibleProductCount: number;
  totalProductCount: number;
  statusFilter: ProductStatusOption;
  marketplaceFilter: string;
  sortOption: ProductSortOption;
  marketplaces: Array<[string, string]>;
  onStatusFilterChange: (value: ProductStatusOption) => void;
  onMarketplaceFilterChange: (value: string) => void;
  onSortOptionChange: (value: ProductSortOption) => void;
};

export function AdminProductListControls({
  visibleProductCount,
  totalProductCount,
  statusFilter,
  marketplaceFilter,
  sortOption,
  marketplaces,
  onStatusFilterChange,
  onMarketplaceFilterChange,
  onSortOptionChange,
}: AdminProductListControlsProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600">
        {visibleProductCount}{" "}
        {visibleProductCount === 1 ? "produto" : "produtos"}
        {(statusFilter !== "all" || marketplaceFilter !== "all") &&
          ` de ${totalProductCount}`}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <FormSelect
            id="product-status-filter"
            label="Status:"
            labelClassName="mb-0 whitespace-nowrap text-sm font-medium text-gray-700"
            wrapperClassName="flex items-center gap-2"
            value={statusFilter}
            onChange={(event) => {
              if (isProductStatusOption(event.target.value)) {
                onStatusFilterChange(event.target.value);
              }
            }}
            className="w-auto min-w-40 px-3 py-2 text-gray-700 focus:border-blue focus:ring-blue/20"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="available">Disponíveis</option>
            <option value="unavailable">Indisponíveis</option>
            <option value="destaque">Em ofertas em destaque</option>
            <option value="not-destaque">Fora das ofertas em destaque</option>
            <option value="best-seller">Em produtos mais vendidos</option>
            <option value="not-best-seller">
              Fora dos produtos mais vendidos
            </option>
        </FormSelect>

        <FormSelect
            id="product-marketplace-filter"
            label="Marketplace:"
            labelClassName="mb-0 whitespace-nowrap text-sm font-medium text-gray-700"
            wrapperClassName="flex items-center gap-2"
            value={marketplaceFilter}
            onChange={(event) => onMarketplaceFilterChange(event.target.value)}
            className="w-auto min-w-40 px-3 py-2 text-gray-700 focus:border-blue focus:ring-blue/20"
          >
            <option value="all">Todos os marketplaces</option>
            {marketplaces.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </FormSelect>

        <FormSelect
            id="product-sort"
            label="Ordenar por:"
            labelClassName="mb-0 whitespace-nowrap text-sm font-medium text-gray-700"
            wrapperClassName="flex items-center gap-2"
            value={sortOption}
            onChange={(event) => {
              if (isProductSortOption(event.target.value)) {
                onSortOptionChange(event.target.value);
              }
            }}
            className="w-auto min-w-40 px-3 py-2 text-gray-700 focus:border-blue focus:ring-blue/20"
          >
            <option value="newest">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
            <option value="title-asc">Nome: A a Z</option>
            <option value="title-desc">Nome: Z a A</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
        </FormSelect>
      </div>
    </div>
  );
}
