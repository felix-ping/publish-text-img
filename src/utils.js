export function uploadImgToBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader)
    }
    reader.onerror = reject
  })
}
