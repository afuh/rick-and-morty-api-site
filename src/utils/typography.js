import Typography from "typography";
import github from "typography-theme-github";

const typography = new Typography(github)
const { rhythm, scale } = typography;

export { rhythm, scale, typography as default };
