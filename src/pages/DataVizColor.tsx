import { Box, Heading, Text, Flex } from '@radix-ui/themes'
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
const barHeights = [70, 50, 85, 40, 65, 55]

export function DataVizColor() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Data Visualization</Text>
        <Heading as="h1" size="8" mb="2">Color in Data Viz</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Data viz color has different constraints than UI color. Distinctness, perceptual ordering, and colorblind accessibility all demand specific choices.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Choose the palette type based on what the data represents:
        </Text>
        <ul>
          <li><strong>Categorical</strong> — for nominal data with no order (product lines, countries, cohorts). Each category gets a visually distinct color.</li>
          <li><strong>Sequential</strong> — for ordered, continuous data (temperature, revenue). Uses a single hue ramping from light to dark.</li>
          <li><strong>Diverging</strong> — for data with a meaningful midpoint (above/below baseline, positive/negative). Two hues meeting at a neutral center.</li>
        </ul>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          Building a good categorical palette is harder than it looks. Requirements: colors must be visually distinct (hue difference ≥ 30°), distinguishable when small (line weight, marker size), and work on both white and dark backgrounds.
        </Text>

        <Box className="demo-card">
          <Box className="demo-card-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">Categorical palette — 6 colors</Text>
          </Box>
          <Flex p="4" gap="3">
            {categoricalColors.map(color => (
              <Box key={color.name} className="cat-color-item">
                <Box
                  className="cat-swatch"
                  style={{ '--swatch-bg': color.hex } as React.CSSProperties}
                  aria-label={`${color.name}: ${color.hex}`}
                />
                <Text as="span" className="cat-swatch-label">{color.label}</Text>
              </Box>
            ))}
          </Flex>
          <Box px="4" pb="4">
            <Text size="1" color="gray" mb="2" style={{ display: 'block' }}>Simulated use — bar chart</Text>
            <Flex className="bar-chart-demo">
              {categoricalColors.map((color, i) => (
                <Box
                  key={color.name}
                  className="bar-chart-bar"
                  style={{
                    '--bar-color': color.hex,
                    '--bar-height': `${barHeights[i]}%`,
                  } as React.CSSProperties}
                  aria-label={`${color.name} bar`}
                />
              ))}
            </Flex>
          </Box>
        </Box>

        <Text size="1" color="gray" mb="2" style={{ display: 'block' }}>Sequential scale — single hue (violet)</Text>
        <Flex className="seq-strip" mb="6">
          {sequentialColors.map((hex, i) => (
            <Box
              key={i}
              className="seq-strip-item"
              style={{ '--strip-color': hex } as React.CSSProperties}
              aria-label={hex}
            />
          ))}
        </Flex>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          About 8% of men and 0.5% of women have some form of color vision deficiency. The most common: deuteranopia (green deficiency) and protanopia (red deficiency), collectively "red-green" color blindness.
        </Text>
        <Text as="p" size="3" mb="3">Rules for colorblind-accessible visualization:</Text>
        <ul>
          <li><strong>Never use red + green as the only distinguishing encoding</strong> — the most common failure in alert/success charts and positive/negative series</li>
          <li><strong>Vary lightness, not just hue</strong> — colors at different lightness values remain distinguishable even with color vision deficiencies</li>
          <li><strong>Use secondary encodings</strong> — pattern fills, dashed vs. solid lines, different marker shapes</li>
          <li><strong>Test with simulation</strong> — Figma has a built-in color blindness viewer; Coblis is a web tool for testing images</li>
        </ul>

        <Callout type="warning" title="The red/green dashboard">
          "Red = bad, green = good" is the most common colorblind failure in product analytics. Use a diverging scale with blue/orange instead — distinguishable under all common forms of color vision deficiency.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          Visualization colors need a separate dark mode adjustment — the same saturated colors that work on white become harsh and over-vibrant on dark backgrounds. In dark mode:
        </Text>
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
