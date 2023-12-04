import fg from "fast-glob";
import path from "path";

const filePath = path.join(process.cwd(), "registrations/IA34FE");
const entries = fg.sync([`${filePath}/registration-proof.*{jpg,jpeg,png}`]);

console.log(filePath, entries);
