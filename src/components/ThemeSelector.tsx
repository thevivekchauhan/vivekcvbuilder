
import { ColorTheme } from "./ResumeBuilder";
import { Button } from "@/components/ui/button";

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const themes = [
  { id: "navy", name: "Navy Blue", colors: ["bg-slate-800", "bg-gray-100"] },
  { id: "blue", name: "Ocean Blue", colors: ["bg-blue-600", "bg-blue-50"] },
  { id: "green", name: "Forest Green", colors: ["bg-emerald-600", "bg-emerald-50"] },
  { id: "purple", name: "Royal Purple", colors: ["bg-purple-600", "bg-purple-50"] },
];

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {themes.map((theme) => (
        <Button
          key={theme.id}
          variant={currentTheme === theme.id ? "default" : "outline"}
          size="sm"
          onClick={() => onThemeChange(theme.id as ColorTheme)}
          className="flex items-center gap-2"
        >
          <div className="flex gap-1">
            <div className={`w-3 h-3 rounded-full ${theme.colors[0]}`} />
            <div className={`w-3 h-3 rounded-full ${theme.colors[1]} border border-gray-300`} />
          </div>
          {theme.name}
        </Button>
      ))}
    </div>
  );
};
