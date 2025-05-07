export interface IProduct {
  id: string,
  name: string
  description: string
  price: number
  image: string
  tags: string[]
  filters: Filters
  specs: Specs
}

export interface Filters {
  strap: string
  dial_color: string
  case_material: string
  category: string
}

export interface Specs {
  case_diameter_mm: number
  strap_material: string
  water_resistance: string
}
