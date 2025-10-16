// 🔹 SubCatalog uchun qisqa view
export interface CatalogShort {
  id: number;
  name: string;
}

// 🔹 SubCatalog asosiy model
export interface SubCatalog {
  id: number;
  name: string;
  catalog: CatalogShort;
}

export interface SubCatalogResponse {
  statusCode: number;
  message: string;
  data: SubCatalog;
}

// 🔹 Catalogdagi SubCatalog qisqa view
export interface SubCatalogShort {
  id: number;
  name: string;
}

// 🔹 Catalog asosiy model
export interface Catalog {
  id: number;
  name: string;
  subCatalogs: SubCatalogShort[];
}

export interface CatalogResponse {
  statusCode: number;
  message: string;
  data: Catalog;
}

// 🔹 Category ichidagi image
export interface ImageType {
  id: number;
  url: string;
}

// 🔹 Category ichidagi subcatalog
export interface SubCatalogInCategory {
  id: number;
  name: string;
}

// 🔹 Category asosiy model
export interface Category {
  id: number;
  name: string;
  image: ImageType;
  subCatalog: SubCatalogInCategory;
}

export interface CategoryResponse {
  statusCode: number;
  message: string;
  data: Category;
}

// 🔹 Brand uchun
export interface BrandImage {
  id: number;
  url: string;
}

export interface Brand {
  id: number;
  name: string;
  image: BrandImage;
  description: string;
}

// 🔹 Umumiy CatalogData state tipi
export interface CatalogDataType {
  catalog: Catalog[];
  subcatalog: SubCatalog[];
  category: Category[];
}

export interface BrandType {
  id: number;
  name: string;
  image: BrandImage;
  description: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  tags: string[];
  category: string;
  count: number;
  
}
