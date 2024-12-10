import { sanityClient } from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'

import type { ImageSource } from '../types/image-source'

export function buildImageUrl(source: ImageSource) {
  return String(imageUrlBuilder(sanityClient).image(source))
}
