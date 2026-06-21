export default function QuestionBlock({ question }: { question: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        The question
      </p>
      <p className="mt-2 text-lg font-medium leading-relaxed">{question}</p>
    </div>
  );
}
