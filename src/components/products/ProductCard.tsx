import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  locale: Locale;
};

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
      {product.image ? (
        <div className="relative aspect-square bg-white">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-plum">{product.name[locale]}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          {product.description[locale]}
        </p>
      </div>
    </article>
  );
}
