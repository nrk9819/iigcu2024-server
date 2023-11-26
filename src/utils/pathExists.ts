import fs from "fs/promises";

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path, fs.constants.F_OK);
    return true; // Directory exists
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return false; // Directory does not exist
    } else {
      throw error; // Something went wrong (e.g., permission issues)
    }
  }
}

export default pathExists;
