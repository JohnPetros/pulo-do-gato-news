import type { ImageUrlBuilder } from 'sanity'

export type ImageSource = Parameters<ImageUrlBuilder['image']>[0]
