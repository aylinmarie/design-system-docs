import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'scale-types', label: 'Scale types', level: 2 },
  { id: 'categorical', label: 'Categorical palettes', level: 2 },
  { id: 'colorblind', label: 'Color blindness', level: 2 },
  { id: 'dark-mode', label: 'Viz in dark mode', level: 2 },
]

const categoricalColors = [
  { name: 'Series 1', hex: '#7c3aed', label: 'Violet' },
  { name: 'Series 2', hex: '#2563eb', label: 'Blue' },
  { name: 'Series 3', hex: '#059669', label: 'Green' },
  { name: 'Series 4', hex: '#d97706', label: 'Amber' },
  { name: 'Series 5', hex: '#dc2626', label: 'Red' },
  { name: 'Series 6', hex: '#0891b2', label: 'Cyan' },
]

const sequentialColors = ['#f5f3ff', '#ddd6fe', '#a78bfa', '#7c3aed', '#5b21b6', '#3b0764']

export function DataVizColor() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Data Visualization</span>
        </div>
        <h1>Color in Data Viz</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Data viz color has different constraints than UI color. Distinctness, perceptual ordering, and colorblind accessibility all demand specific choices.
        </p>

        <h2 id="scale-types">Scale types</h2>
        <p>
          Choose the palette type based on what the data represents:
        </p>
        <ul>
          <li><strong>Categorical</strong> — for nominal data with no order (product lines, countries, cohorts). Each category gets a visually distinct color.</li>
          <li><strong>Sequential</strong> — for ordered, continuous data (temperature, revenue). Uses a single hue ramping from light to dark.</li>
          <li><strong>Diverging</strong> — for data with a meaningful midpoint (above/below baseline, positive/negative). Two hues meeting at a neutral center.</li>
        </ul>

        <h2 id="categorical">Categorical palettes</h2>
        <p>
          Building a good categorical palette is harder than it looks. Requirements: colors must be visually distinct (hue difference ≥ 30°), distinguishable when small (line weight, marker size), and work on both white and dark backgrounds.
        </p>

        <div className="my-5 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categorical palette — 6 colors</p>
          </div>
          <div className="p-4 flex gap-3">
            {categoricalColors.map(color => (
              <div key={color.name} className="flex-1 text-center">
                <div
                  className="w-full h-12 rounded-lg mb-2"
                  style={{ background: color.hex }}
                  aria-label={`${color.name}: ${color.hex}`}
                />
                <p className="text-gray-500 m-0" style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  {color.label}
                </p>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-400 mb-2">Simulated use — bar chart</p>
            <div className="flex items-end gap-2 h-20 bg-gray-50 rounded-lg px-3 pt-3">
              {categoricalColors.map((color, i) => (
                <div
                  key={color.name}
                  className="flex-1 rounded-t"
                  style={{
                    background: color.hex,
                    height: `${[70, 50, 85, 40, 65, 55][i]}%`,
                    opacity: 0.85,
                  }}
                  aria-label={`${color.name} bar`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-4">Sequential scale — single hue (violet)</p>
        <div className="flex rounded-lg overflow-hidden mb-6 h-10">
          {sequentialColors.map((hex, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ background: hex }}
              aria-label={hex}
            />
          ))}
        </div>

        <h2 id="colorblind">Color blindness</h2>
        <p>
          About 8% of men and 0.5% of women have some form of color vision deficiency. The most common: deuteranopia (green deficiency) and protanopia (red deficiency), collectively "red-green" color blindness.
        </p>
        <p>
          Rules for colorblind-accessible visualization:
        </p>
        <ul>
          <li><strong>Never use red + green as the only distinguishing encoding</strong> — the most common failure in alert/success charts and positive/negative series</li>
          <li><strong>Vary lightness, not just hue</strong> — colors at different lightness values remain distinguishable even with color vision deficiencies</li>
          <li><strong>Use secondary encodings</strong> — pattern fills, dashed vs. solid lines, different marker shapes</li>
          <li><strong>Test with simulation</strong> — Figma has a built-in color blindness viewer; Coblis is a web tool for testing images</li>
        </ul>

        <Callout type="warning" title="The red/green dashboard">
          "Red = bad, green = good" is the most common colorblind failure in product analytics. Use a diverging scale with blue/orange instead — distinguishable under all common forms of color vision deficiency.
        </Callout>

        <h2 id="dark-mode">Viz in dark mode</h2>
        <p>
          Visualization colors need a separate dark mode adjustment — the same saturated colors that work on white become harsh and over-vibrant on dark backgrounds. In dark mode:
        </p>
        <ul>
          <li>Reduce saturation by 15–25%</li>
          <li>Increase lightness slightly so colors don't disappear</li>
          <li>Use lighter gridlines (white at low opacity rather than gray)</li>
          <li>Labels need to pass contrast against the dark surface (often requires increasing font weight)</li>
        </ul>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
