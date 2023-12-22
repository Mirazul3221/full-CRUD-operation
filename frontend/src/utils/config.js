const mode = "dev";
let base_url = "";

if (mode) {
  base_url = "http://localhost:5000";
} else {
  base_url = "";
}

export { base_url };
