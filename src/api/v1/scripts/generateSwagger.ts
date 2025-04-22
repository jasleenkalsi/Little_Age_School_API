import fs from "fs";
import swaggerSpec from "../../../../config/swagger"; // Ensure correct import from config folder

// Write OpenAPI spec to a JSON file in the root directory
fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));

console.log("✅ OpenAPI specification generated: swagger.json");
