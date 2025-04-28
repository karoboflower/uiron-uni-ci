import { ref } from "vue";
const theme = ref<"yellow" | "blue">('yellow');
const themeVars = ref<any>();
const themeMap = {
  yellow: {
    colorTheme: "#ffe500",
    colorWarning: "#ff6b00",
    colorSuccess: "#84dd83",
    colorDanger: "#f35f53",
    colorInfo: "#f4f4f4",
  },
  blue: {
    colorTheme: "#4571eb",
    colorWarning: "#ff6b00",
    colorSuccess: "#84dd83",
    colorDanger: "#f35f53",
    colorInfo: "#f4f4f4",
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
