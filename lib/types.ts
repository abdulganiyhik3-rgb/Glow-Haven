// Types describe the "shape" of our data, so TypeScript can warn us about mistakes.

export type Category = 'Skincare' | 'Fragrances' | 'Lip Care' | 'Body Care'

export type Product = {
  id: string
  name: string
  category: Category
  price: number // in naira, e.g. 18500 means ₦18,500
  previousPrice?: number // optional: only discounted products have this
  rating: number // sample rating out of 5
  reviewCount: number // sample number of reviews
  image: string
  description: string
}

// A cart item is just a product plus how many the customer wants.
export type CartItem = {
  product: Product
  quantity: number
}
