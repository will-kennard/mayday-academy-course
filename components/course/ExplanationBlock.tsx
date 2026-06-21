export default function ExplanationBlock({
  explanation,
}: {
  explanation: string;
}) {
  return (
    <section>
      <h2 className="font-poppins text-2xl font-semibold tracking-tight">Explanation</h2>
      <p className="mt-3 leading-relaxed text-foreground/90">{explanation}</p>
    </section>
  );
}
