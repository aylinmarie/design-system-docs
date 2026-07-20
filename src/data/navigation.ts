export interface NavItem {
  label: string;
  path: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", path: "/" },
      { label: "What Is a Design System?", path: "/what-is-a-design-system" },
    ],
  },
  // {
  //   title: "Foundations",
  //   items: [
  //     { label: "Design Tokens", path: "/design-tokens" },
  //     { label: "Typography", path: "/typography" },
  //     { label: "Color", path: "/color" },
  //     { label: "Spacing & Grid", path: "/spacing" },
  //     { label: "Iconography", path: "/iconography" },
  //   ],
  // },
  // {
  //   title: "Accessibility",
  //   items: [
  //     { label: "Why It Matters", path: "/accessibility" },
  //     { label: "Color & Contrast", path: "/accessibility/color-contrast" },
  //     { label: "Keyboard Navigation", path: "/accessibility/keyboard" },
  //     { label: "ARIA & Semantics", path: "/accessibility/aria" },
  //   ],
  // },
  // {
  //   title: "Data Visualization",
  //   items: [
  //     { label: "Principles", path: "/data-viz" },
  //     { label: "Color in Data Viz", path: "/data-viz/color" },
  //     { label: "Chart Patterns", path: "/data-viz/charts" },
  //   ],
  // },
  // {
  //   title: "Component Architecture",
  //   items: [
  //     { label: "Component API Design", path: "/component-api" },
  //     { label: "Composition Patterns", path: "/composition" },
  //   ],
  // },
  // {
  //   title: "Governance",
  //   items: [
  //     { label: "Contribution Model", path: "/governance" },
  //     { label: "Versioning & Releases", path: "/versioning" },
  //   ],
  // },
];
