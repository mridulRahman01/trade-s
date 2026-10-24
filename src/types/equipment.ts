export type CategorySlug = "excavators" | "bulldozers";

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface EquipmentSpec {
  label: string;
  value: string;
  verified?: boolean; // false indicates 'TO CONFIRM'
}

export interface EquipmentRates {
  daily?: number;
  weekly?: number;
  monthly?: number;
  note?: string;
}

export interface EquipmentImage {
  src: string;
  alt: string;
}

export interface Equipment {
  slug: string;
  name: string;
  category: CategorySlug;
  brand: string;
  summary: string;
  description: string;
  images: EquipmentImage[];
  specs: EquipmentSpec[];
  rates?: EquipmentRates;
  features: string[];
  bestFor: string[];
  featured?: boolean;
  available: boolean;
  dataNote?: string; // Internal or client note
}
