type PageShellProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-olive">
          Fruttata Exports
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
