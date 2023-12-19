export function bytesToSize(bytes: any) {
  if (bytes === 0) return '0 Bytes'
  const kilo: any = 1000
  const sizes: any = ['m', 'Km']
  const index: any = Math.floor(Math.log(bytes) / Math.log(kilo))
  return parseFloat((bytes / Math.pow(kilo, index)).toFixed(2)) + ' ' + sizes[index]
}
