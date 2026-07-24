import { Box, Text, IconButton, Flex, Badge } from "@radix-ui/themes";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useThemeMode } from "./ThemeModeProvider";
import { Logomark } from "./Logomark";

interface HeaderProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const { mode, toggle } = useThemeMode();

  return (
    <header className="app-header">
      <Box className="header-inner">
        {/* Logo */}
        <RouterLink to="/" className="header-logo">
          <Logomark />
          <Flex align="center" gap="2">
            <Text size="2" weight="medium" color="gray">
              Design Systems Docs
            </Text>
            <Badge color="orange">WIP</Badge>
          </Flex>
        </RouterLink>

        {/* Search (visual placeholder — no search index yet) */}
        {/* <Box className="header-search">
          <Box className="header-search-box">
            <Search
              size={14}
              className="header-search-icon"
              aria-hidden="true"
            />
            <Text size="2" color="gray" className="header-search-placeholder">
              Search docs&hellip;
            </Text>
            <Text asChild className="header-kbd">
              <kbd>&#8984;K</kbd>
            </Text>
          </Box>
        </Box> */}

        <Box className="header-spacer" />

        {/* Dark mode toggle */}
        <IconButton
          variant="ghost"
          color="gray"
          onClick={toggle}
          aria-label={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          size="2"
        >
          {mode === "dark" ? (
            <Sun size={16} aria-hidden="true" />
          ) : (
            <Moon size={16} aria-hidden="true" />
          )}
        </IconButton>

        {/* Mobile menu toggle */}
        <IconButton
          variant="ghost"
          color="gray"
          onClick={onMenuToggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="header-toggle"
          size="2"
        >
          {menuOpen ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <Menu size={18} aria-hidden="true" />
          )}
        </IconButton>
      </Box>
    </header>
  );
}
