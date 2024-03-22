module.exports = {
  styleFilter: (styles, photos, skus) => {
    styles.forEach((style) => {
      style['photos'] = photos.filter((photo) => {
        return style.id === photo.styleid
      })
      style['skus'] = skus.filter((sku) => {
        return style.id === sku.styleid
      })
    })
  }
}