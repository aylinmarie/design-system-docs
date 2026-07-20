import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'chart-selection', label: 'Choosing the right chart', level: 2 },
  { id: 'common-patterns', label: 'Common chart patterns', level: 2 },
  { id: 'anti-patterns', label: 'Anti-patterns to avoid', level: 2 },
]

const chartTypes = [
  { type: 'Bar / Column', use: 'Comparing quantities across categories', avoid: 'More than ~10 categories', icon: '▬' },
  { type: 'Line', use: 'Trends over time, continuous data', avoid: 'Discrete, unordered categories', icon: '╱' },
  { type: 'Scatter', use: 'Correlation between two variables', avoid: 'When one variable is categorical', icon: '⠿' },
  { type: 'Area', use: 'Part-to-whole over time (stacked)', avoid: 'More than 4–5 series (becomes unreadable)', icon: '△' },
  { type: 'Heatmap', use: 'Density, patterns across two dimensions', avoid: 'Small datasets where exact values matter', icon: '▦' },
  { type: 'Donut / Pie', use: 'Part-to-whole (max 5 slices)', avoid: 'Comparisons, trends, or more than 5 slices', icon: '◎' },
]

export function DataVizCharts() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Data Visualization</span>
        </div>
        <h1>Chart Patterns</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          When all dashboards in a product use the same chart anatomy, users can switch between them without relearning how to read axes, legends, or tooltips. That's the practical return on standardizing chart patterns.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          The choice of chart type should be driven by the data relationship you're communicating, not aesthetic preference. Use this as a reference:
        </p>

        <div className="my-5 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 grid grid-cols-3 gap-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider m-0">Chart type</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider m-0">Use when</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider m-0">Avoid when</p>
          </div>
          <div className="divide-y divide-gray-50">
            {chartTypes.map(chart => (
              <div key={chart.type} className="px-4 py-3 grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 text-lg leading-none">{chart.icon}</span>
                  <span className="font-medium text-gray-900 text-xs">{chart.type}</span>
                </div>
                <span className="text-gray-600 text-xs leading-relaxed">{chart.use}</span>
                <span className="text-gray-400 text-xs leading-relaxed">{chart.avoid}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 id={toc[1].id}>{toc[1].label}</h2>

        <h3>The anatomy of a system chart</h3>
        <p>
          Document the anatomy of your standard chart components so that all instances share the same structure:
        </p>
        <ul>
          <li><strong>Chart container</strong> — handles sizing, responsive behavior, loading/empty states</li>
          <li><strong>Title region</strong> — title, subtitle, optional metadata (date range, source)</li>
          <li><strong>Legend</strong> — positioned above the chart (not to the right) for better scannability</li>
          <li><strong>Plot area</strong> — the marks themselves, bounded by axes</li>
          <li><strong>Axes</strong> — x-axis at bottom, y-axis at left; labels outside the plot area</li>
          <li><strong>Tooltip</strong> — on hover/focus, shows exact values with accessible keyboard support</li>
        </ul>

        <h3>Sparklines & summary metrics</h3>
        <p>
          For dashboards, a common pattern is a metric card with an inline sparkline — a small trend chart without axes. Keep sparklines strictly presentational (no interaction). The metric number is what the user needs; the sparkline provides directional context only.
        </p>
        <pre><code>{`// Metric card pattern
<div role="figure" aria-label="Monthly active users: 24,891 (↑12% vs. last month)">
  <MetricValue value={24891} label="Monthly active users" />
  <ChangeIndicator delta={+12} unit="%" period="vs. last month" />
  <Sparkline data={historicalData} aria-hidden="true" />
</div>`}</code></pre>

        <h2 id={toc[2].id}>{toc[2].label}</h2>

        <Callout type="warning" title="The worst offenders">
          These chart patterns appear constantly and communicate poorly.
        </Callout>

        <ul>
          <li><strong>3D charts</strong> — depth encoding distorts area and angle perception. Always.</li>
          <li><strong>Dual y-axes</strong> — implies a relationship between two unrelated series. If you need two y-axes, you probably need two charts.</li>
          <li><strong>Pie charts with more than 5 slices</strong> — use a ranked bar chart instead, and show the percentage as a label.</li>
          <li><strong>Truncated y-axes</strong> — starting a bar chart at something other than zero exaggerates differences. If the range is too tight, use a different chart type.</li>
          <li><strong>Overloaded legends</strong> — if the legend has more than 6 items, the chart is trying to show too much at once. Split it.</li>
          <li><strong>Animation as default</strong> — loading animations on charts add latency with no perceptual benefit. Save animation for transitions that communicate data change.</li>
        </ul>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
