import {one} from './dom'
import {
  EMPTY_IMG,
  DEFAULT_PORTRAIT,
  MAX_IMG_SIZE,
  IMG_PATH_PREFIX
} from './constants'

export const imgPath = (path, defaultImg = DEFAULT_PORTRAIT) =>
  path ? /^(https?:\/|data:image)\//ig.test(path) ? path : IMG_PATH_PREFIX + path : defaultImg


export function resizeImg(url, success, error, imgType, width, height) {
  const img = new Image();

  /^https?:\/\//i.test(url) && (img.crossOrigin = 'Anonymous')

  one(img, 'load', function () {
    const imgWidth = this.width
    width = width || Math.min(imgWidth, 768)
    height = height || this.height * width / imgWidth
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    drawImageFix(canvas.getContext('2d'), img, 0, 0, width, height)
    const result = canvas.toDataURL(imgType || 'image/jpeg')
    if (result.length > MAX_IMG_SIZE) return alert('图片压缩后仍超过3M, 请更换后重试!')
    success && success.call(this, result)
  })

  one(img, 'error', error)

  img.src = url
  // make sure the load event fires for cached images too
  if (img.complete || img.complete === undefined) {
    img.src = EMPTY_IMG
    img.src = url
  }
}

export function resizeImgFile(file, success, error, width, height) {
  const fileType = file.type

  if (!/^image\//i.test(fileType)) return alert('请确保文件为图像类型')

  const reader = new FileReader()
  reader.readAsDataURL(file)
  one(reader, 'load', function () {
    resizeImg(this.result, success, error, fileType, width, height)
  })
}

export function uploadImg(file, success) {
  const fileType = file.type

  if (!/^image\//i.test(fileType)) return alert('请确保文件为图像类型')

  const reader = new FileReader()
  reader.readAsDataURL(file)
  one(reader, 'load', function () {
    success.call(this, this.result)
  })
}

/**
 * 获取加载完成的图片（异步）
 * @param src{string} 图片地址
 * @returns {Promise}
 */
export function getImgLoadFinish(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      resolve(img)
    }
  })
}
