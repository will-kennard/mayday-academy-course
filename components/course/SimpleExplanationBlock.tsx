export default function SimpleExplanationBlock({
  explanation,
}: {
  explanation: string;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface-muted p-6">
      <h2 className="text-base font-semibold tracking-tight">
        Keeping it simple
      </h2>
      <p className="mt-2 leading-relaxed text-foreground/90">{explanation}</p>
    </section>
  );
}
