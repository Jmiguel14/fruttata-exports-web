import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  quoteLabel: string;
};

export function ProductCard({ product, locale, quoteLabel }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-olive/50 hover:shadow-lg">
      {product.image ? (
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-plum">{product.name[locale]}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
          {product.description[locale]}
        </p>
        <Link
          href={{ pathname: "/contact", query: { product: product.id } }}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-olive-dark transition-colors hover:text-plum"
        >
          {quoteLabel}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
