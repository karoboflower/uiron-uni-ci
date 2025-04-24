import { ref } from "vue";
const theme = ref<"yellow" | "blue">('yellow');
const themeVars = ref<any>();
const themeMap = {
  yellow: {
    colorTheme: "#F6A623",
    colorTextBase: "#333333",
    colorTextLight: "#FFFFFF",
    colorTextPlaceholder: "#999999",
    colorBgBase: "#F5F5F5",
  },
  blue: {
    colorTheme: "#007AFF",
    colorTextBase: "#333333",
    colorTextLight: "#FFFFFF",
    colorTextPlaceholder: "#999999",
    colorBgBase: "#F5F5F5",
  },
};
export function useTheme() {
  function toggleTheme(mode: "yellow" | "blue") {
    theme.value = mode;
    themeVars.value = themeMap[mode];
  }
  return {
    theme,
    themeVars,
    toggleTheme,
  };
}
