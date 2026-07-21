import { Heading, Text } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'principles', label: 'Core principles', level: 2 },
  { id: 'hierarchy', label: 'Visual hierarchy in charts', level: 2 },
  { id: 'tokens', label: 'Data viz tokens', level: 2 },
  { id: 'accessibility', label: 'Accessibility in charts', level: 2 },
]

export function DataViz() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Data Visualization</Text>
        <Heading as="h1" size="8" mb="2">Principles</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Data visualization is one of the hardest design problems to systematize. The number of ways to get it wrong vastly outnumber the ways to get it right.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>

        <h3>Encode data, don't decorate it</h3>
        <Text as="p" size="3" mb="3">
          Every visual element in a chart should encode information. Gradients, drop shadows, and 3D effects rarely encode data — they obscure it. Start with the simplest representation that accurately communicates the data, and add visual complexity only when it carries meaning.
        </Text>

        <h3>Choose the right encoding</h3>
        <Text as="p" size="3" mb="3">
          Cleveland and McGill's hierarchy of perceptual accuracy (most to least accurate):
        </Text>
        <ol>
          <li>Position along a common scale</li>
          <li>Position along identical, non-aligned scales</li>
          <li>Length</li>
          <li>Angle and slope</li>
          <li>Area</li>
          <li>Volume, density, color saturation</li>
          <li>Color hue</li>
        </ol>
        <Text as="p" size="3" mb="3">
          This is why bar charts beat pie charts for most comparisons — position along a scale is more accurately perceived than angle.
        </Text>

        <h3>Don't make people do math</h3>
        <Text as="p" size="3" mb="3">
          If the insight requires subtracting two bars or estimating a percentage of a circle, the chart has failed. Annotate directly, call out the specific value, or compute the derived number and show it explicitly.
        </Text>

        <Callout type="tip" title="The annotation is the point">
          The most effective charts in business contexts often have direct annotations — "Revenue up 23% vs. last quarter" — rather than letting the user interpret the visual. The chart provides context; the annotation delivers the insight.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">A chart is a document with a visual hierarchy:</Text>
        <ul>
          <li><strong>Title</strong> — the claim the chart makes, not just a description of the data ("Revenue grew 23% in Q3", not "Q3 Revenue")</li>
          <li><strong>Data layer</strong> — the marks (bars, lines, points) that encode the data. This is the foreground.</li>
          <li><strong>Reference layer</strong> — axes, gridlines, baselines. This is the background. It should recede visually.</li>
          <li><strong>Annotation layer</strong> — callouts, labels, highlights. These are editorial, above the data.</li>
        </ul>
        <Text as="p" size="3" mb="3">
          Most poor charts fail because the reference layer (gridlines, axis labels) competes visually with the data layer. Use light gray for gridlines, reduce label size, and remove everything that doesn't help interpretation.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          Data visualization needs its own token set. These are separate from UI tokens because the color requirements differ — viz colors need to be visually distinct, perceptually ordered (for sequential scales), and work at small mark sizes.
        </Text>
        <pre><code>{`/* Categorical palette — distinct colors for discrete series */
--viz-color-1: #7c3aed;   /* violet */
--viz-color-2: #2563eb;   /* blue */
--viz-color-3: #059669;   /* green */
--viz-color-4: #d97706;   /* amber */
--viz-color-5: #dc2626;   /* red */
--viz-color-6: #0891b2;   /* cyan */

/* Sequential scale — single hue, for ordered data */
--viz-seq-100: #f5f3ff;
--viz-seq-300: #c4b5fd;
--viz-seq-500: #8b5cf6;
--viz-seq-700: #6d28d9;
--viz-seq-900: #4c1d95;

/* Diverging scale — two hues, for data with a meaningful midpoint */
--viz-div-low:  #2563eb;   /* below baseline */
--viz-div-mid:  #e5e7eb;   /* neutral */
--viz-div-high: #dc2626;   /* above baseline */

/* Structural tokens */
--viz-axis-color:     #e5e7eb;
--viz-gridline-color: #f3f4f6;
--viz-label-color:    #6b7280;`}</code></pre>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          Charts are one of the most inaccessible parts of most products. Minimum requirements:
        </Text>
        <ul>
          <li><strong>Never rely on color alone</strong> — use pattern, shape, or position as a secondary encoding</li>
          <li><strong>Provide a text alternative</strong> — a table or summary paragraph for screen reader users</li>
          <li><strong>Use <code>role="img"</code> and <code>aria-label</code></strong> on the chart container with a descriptive label</li>
          <li><strong>Keyboard-accessible tooltips</strong> — if hover triggers data, Tab must too</li>
          <li><strong>Test with color blindness simulators</strong> — Coblis and Figma's color blindness plugin. Deuteranopia (red-green) is most common.</li>
        </ul>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
