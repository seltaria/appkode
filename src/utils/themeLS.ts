export const getSavedThemeFromLS = (): "dark" | "light" => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return JSON.parse(savedTheme);
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const saveThemeToLS = (theme: "dark" | "light") => {
  localStorage.setItem("theme", JSON.stringify(theme));
};
