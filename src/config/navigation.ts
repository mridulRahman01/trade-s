import { categories } from "@/data/categories";
import { allEquipment } from "@/data/equipment";

export interface NavChildItem {
  label: string;
  name?: string;
  href: string;
  slug: string;
}

export interface NavChildGroup {
  categorySlug: string;
  categoryName: string;
  items: NavChildItem[];
}

export interface NavItem {
  label: string;
  title?: string;
  href: string;
  children?: NavChildItem[];
  childrenGroups?: NavChildGroup[];
}

export const navigationConfig = {
  /**
   * Primary site navigation items used by mobile drawer and global navigation
   */
  mainNav: [
    { label: "Home", title: "Home", href: "/" },
    {
      label: "Equipment",
      title: "Equipment",
      href: "/#equipment",
      children: allEquipment.map((item) => ({
        label: item.name,
        name: item.name,
        href: `/equipment/${item.slug}`,
        slug: item.slug,
      })),
      childrenGroups: categories.map((cat) => ({
        categorySlug: cat.slug,
        categoryName: cat.name,
        items: allEquipment
          .filter((item) => item.category === cat.slug)
          .map((item) => ({
            label: item.name,
            name: item.name,
            href: `/equipment/${item.slug}`,
            slug: item.slug,
          })),
      })),
    },
    { label: "About", title: "About", href: "/about" },
    { label: "Rental Rates", title: "Rental Rates", href: "/rental-rates" },
    { label: "Contact", title: "Contact", href: "/#contact" },
  ] as NavItem[],

  /**
   * Desktop header links (1024px+)
   */
  desktopNav: [
    { label: "Equipment", title: "Equipment", href: "/#equipment" },
    { label: "About", title: "About", href: "/about" },
    { label: "Rental Rates", title: "Rental Rates", href: "/rental-rates" },
  ] as NavItem[],

  /**
   * Footer links
   */
  footerNav: [
    { label: "Home", title: "Home", href: "/" },
    { label: "Equipment", title: "Equipment", href: "/#equipment" },
    { label: "About", title: "About", href: "/about" },
    { label: "Rental Rates", title: "Rental Rates", href: "/rental-rates" },
    { label: "Contact", title: "Contact", href: "/#contact" },
  ] as NavItem[],

  privacyHref: "/privacy",
};
