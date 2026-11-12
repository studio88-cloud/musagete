// Foto del profilo scelta dall'utente: ritagliata quadrata, ridotta e salvata sul dispositivo.
const KEY = 'musagete:avatar'
const SIZE = 256

export function loadPhoto() {
  try {
    return localStorage.getItem(KEY) || null
  } catch {
    return null
  }
}

export function savePhoto(dataUrl) {
  try {
    if (dataUrl) localStorage.setItem(KEY, dataUrl)
    else localStorage.removeItem(KEY)
  } catch {
    // spazio esaurito o storage non disponibile: la foto vale solo per questa sessione
  }
}

// File immagine → data URL JPEG quadrato 256×256 (ritaglio al centro)
export function fileToAvatar(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('not-image'))
      return
    }
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const side = Math.min(img.naturalWidth, img.naturalHeight)
      const canvas = document.createElement('canvas')
      canvas.width = SIZE
      canvas.height = SIZE
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, SIZE, SIZE)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('load'))
    }
    img.src = url
  })
}
