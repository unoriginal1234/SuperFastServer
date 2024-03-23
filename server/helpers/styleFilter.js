module.exports = {
  styleFilter: (styles, photos, skus) => {
    styles.forEach((style) => {
      style['photos'] = photos.filter((photo) => {
        return style.id === photo.styleid
      })
      .map((photo) => {
        return {
          url: photo.url,
          thumbnail_url: photo.thumbnail_url
        }
      })
      style['skus'] = skus.filter((sku) => {
        return style.id === sku.styleid
      })
      .map((sku) => {
        return {
          size: sku.size,
          quantity: sku.quantity
        }
      })
    })
  }
}