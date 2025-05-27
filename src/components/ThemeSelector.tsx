// import { ColorTheme } from "./ResumeBuilder";
// import { Button } from "@/components/ui/button";

// interface ThemeSelectorProps {
//   currentTheme: ColorTheme;
//   onThemeChange: (theme: ColorTheme) => void;
// }

// const themes = [
//   { id: "navy", name: "Navy Blue", colors: ["bg-slate-800", "bg-gray-100"] },
//   { id: "blue", name: "Ocean Blue", colors: ["bg-blue-600", "bg-blue-50"] },
//   { id: "green", name: "Forest Green", colors: ["bg-emerald-600", "bg-emerald-50"] },
//   { id: "purple", name: "Royal Purple", colors: ["bg-purple-600", "bg-purple-50"] },
//   { id: "sunset", name: "Sunset Orange", colors: ["bg-orange-500", "bg-orange-50"] },
//   { id: "sky", name: "Sky Light", colors: ["bg-sky-500", "bg-sky-50"] },
//   { id: "teal", name: "Teal Dream", colors: ["bg-teal-600", "bg-teal-50"] },
//   { id: "amber", name: "Golden Amber", colors: ["bg-amber-500", "bg-amber-50"] },
//   { id: "cyan", name: "Crystal Cyan", colors: ["bg-cyan-600", "bg-cyan-50"] },
//   { id: "pink", name: "Soft Pink", colors: ["bg-pink-600", "bg-pink-50"] },
//   { id: "indigo", name: "Indigo Night", colors: ["bg-indigo-600", "bg-indigo-50"] },
//   { id: "stone", name: "Stone Gray", colors: ["bg-stone-600", "bg-stone-50"] },
//   { id: "fuchsia", name: "Fuchsia Flame", colors: ["bg-fuchsia-600", "bg-fuchsia-50"] },
//   { id: "yellow", name: "Sunbeam Yellow", colors: ["bg-yellow-400", "bg-yellow-50"] },
//   { id: "red", name: "Cherry Red", colors: ["bg-red-600", "bg-red-50"] }
// ];

// export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
//   return (
//     <div className="flex flex-wrap gap-3 justify-center">
//       {themes.map((theme) => (
//         <Button
//           key={theme.id}
//           variant={currentTheme === theme.id ? "default" : "outline"}
//           size="sm"
//           onClick={() => onThemeChange(theme.id as ColorTheme)}
//           className="flex items-center gap-2"
//         >
//           <div className="flex gap-1">
//             <div className={`w-3 h-3 rounded-full ${theme.colors[0]}`} />
//             <div className={`w-3 h-3 rounded-full ${theme.colors[1]} border border-gray-300`} />
//           </div>
//           {theme.name}
//         </Button>
//       ))}
//     </div>
//   );
// };



import { ColorTheme } from "./ResumeBuilder";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Palette } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  className?: string;
}

const themes = [
  { id: "navy", name: "Navy Blue", colors: ["bg-slate-800", "bg-gray-100"] },
  { id: "blue", name: "Ocean Blue", colors: ["bg-blue-600", "bg-blue-50"] },
  { id: "green", name: "Forest Green", colors: ["bg-emerald-600", "bg-emerald-50"] },
  { id: "purple", name: "Royal Purple", colors: ["bg-purple-600", "bg-purple-50"] },
  { id: "sunset", name: "Sunset Orange", colors: ["bg-orange-500", "bg-orange-50"] },
  { id: "sky", name: "Sky Light", colors: ["bg-sky-500", "bg-sky-50"] },
  { id: "teal", name: "Teal Dream", colors: ["bg-teal-600", "bg-teal-50"] },
  { id: "amber", name: "Golden Amber", colors: ["bg-amber-500", "bg-amber-50"] },
  { id: "cyan", name: "Crystal Cyan", colors: ["bg-cyan-600", "bg-cyan-50"] },
  { id: "pink", name: "Soft Pink", colors: ["bg-pink-600", "bg-pink-50"] },
  { id: "indigo", name: "Indigo Night", colors: ["bg-indigo-600", "bg-indigo-50"] },
  { id: "stone", name: "Stone Gray", colors: ["bg-stone-600", "bg-stone-50"] },
  { id: "fuchsia", name: "Fuchsia Flame", colors: ["bg-fuchsia-600", "bg-fuchsia-50"] },
  { id: "yellow", name: "Sunbeam Yellow", colors: ["bg-yellow-400", "bg-yellow-50"] },
  { id: "red", name: "Cherry Red", colors: ["bg-red-600", "bg-red-50"] }
];

export const ThemeSelector = ({ currentTheme, onThemeChange, className }: ThemeSelectorProps) => {
  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];

  return (
    <div className={className}>
      {/* Mobile/Compact View */}
      <div className="lg:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Theme</span>
                <div className="flex gap-1 ml-2">
                  <div className={`w-3 h-3 rounded-full ${currentThemeData.colors[0]}`} />
                  <div className={`w-3 h-3 rounded-full ${currentThemeData.colors[1]} border border-gray-300`} />
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2 grid grid-cols-3 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id as ColorTheme)}
                className={`flex flex-col items-center gap-1 p-2 rounded-md transition-all ${
                  currentTheme === theme.id 
                    ? 'bg-accent border border-border' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex gap-1">
                  <div className={`w-4 h-4 rounded-full ${theme.colors[0]}`} />
                  <div className={`w-4 h-4 rounded-full ${theme.colors[1]} border border-gray-300`} />
                </div>
                <span className="text-xs">{theme.name}</span>
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop/Expanded View */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Color Theme
          </h3>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "outline"}
                size="sm"
                onClick={() => onThemeChange(theme.id as ColorTheme)}
                className="flex items-center gap-2 px-3 py-1 h-auto"
              >
                <div className="flex gap-1">
                  <div className={`w-3 h-3 rounded-full ${theme.colors[0]}`} />
                  <div className={`w-3 h-3 rounded-full ${theme.colors[1]} border border-gray-300`} />
                </div>
                <span>{theme.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};