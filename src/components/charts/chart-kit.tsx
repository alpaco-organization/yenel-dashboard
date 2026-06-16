"use client";

/** Yenel paleti — chart serileri için sıralı renkler */
export const chartPalette = [
  "#38bdf8", // electric
  "#34d399", // mint
  "#a78bfa", // violet
  "#fbbf24", // amber
  "#fb7185", // rose
  "#22d3ee", // cyan
  "#f472b6", // pink
  "#a3e635", // lime
];

interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: ReadonlyArray<{
    name?: string | number;
    value?: string | number;
    color?: string;
  }>;
  formatter?: (value: number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3.5 py-2.5 text-xs shadow-xl">
      {label != null && (
        <p className="mb-1.5 font-medium text-ink-200">{String(label)}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-ink-400">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: entry.color ?? chartPalette[i] }}
              />
              {entry.name}
            </span>
            <span className="font-semibold tabular-nums text-ink-100">
              {formatter
                ? formatter(Number(entry.value))
                : Number(entry.value).toLocaleString("tr-TR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const axisProps = {
  axisLine: false,
  tickLine: false,
  tick: { fill: "#7d8bb0", fontSize: 11 },
} as const;
