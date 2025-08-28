import path from "path"
import fs from "fs"

function getRuntimeScreenshotPath() {
  const cwd = process.cwd()
  const runtimeDir = path.join(cwd, "runtimeScreenshot")

  if (!fs.existsSync(runtimeDir)) {
    fs.mkdirSync(runtimeDir, { recursive: true })
  }

  return runtimeDir
}

export async function saveDownloadAs(page, locator, fileName) {
  const downloadPath = getRuntimeScreenshotPath()

  // Ensure folder exists
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true })
  }

  // Start waiting for download before click
  const downloadPromise = page.waitForEvent("download")

  // Trigger the download
  await locator.click()

  // Wait for the download
  const download = await downloadPromise

  // Auto-detect file extension if not provided
  const suggestedName = download.suggestedFilename()
  const ext = path.extname(suggestedName)
  const finalName = fileName.endsWith(ext) ? fileName : fileName + ext

  const targetPath = path.join(downloadPath, finalName)
  await download.saveAs(targetPath)
  console.log(`Download saved to: ${targetPath}`)
}
