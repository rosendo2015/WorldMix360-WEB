import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../pages/HomePage").then(({ HomePage }) => ({ default: HomePage })),
);

export const AboutPage = lazy(() =>
  import("../pages/AboutPage").then(({ AboutPage }) => ({
    default: AboutPage,
  })),
);
export const ContactPage = lazy(() =>
  import("../pages/ContactPage").then(({ ContactPage }) => ({
    default: ContactPage,
  })),
);
export const HowItWorksPage = lazy(() =>
  import("../pages/HowItWorksPage").then(({ HowItWorksPage }) => ({
    default: HowItWorksPage,
  })),
);
export const PrivacyPolicyPage = lazy(() =>
  import("../pages/PrivacyPolicyPage").then(({ PrivacyPolicyPage }) => ({
    default: PrivacyPolicyPage,
  })),
);
export const TermsOfUsePage = lazy(() =>
  import("../pages/TermsOfUsePage").then(({ TermsOfUsePage }) => ({
    default: TermsOfUsePage,
  })),
);

export const AllCategoriesPage = lazy(() =>
  import("../pages/AllCategoriesPage").then(({ AllCategoriesPage }) => ({
    default: AllCategoriesPage,
  })),
);
export const BestSellersPage = lazy(() =>
  import("../pages/BestSellersPage").then(({ BestSellersPage }) => ({
    default: BestSellersPage,
  })),
);
export const BlogPage = lazy(() =>
  import("../pages/BlogPage").then(({ BlogPage }) => ({ default: BlogPage })),
);
export const BlogPostPage = lazy(() =>
  import("../pages/BlogPostPage").then(({ BlogPostPage }) => ({
    default: BlogPostPage,
  })),
);
export const CategoryPage = lazy(() =>
  import("../pages/CategoriesPage").then(({ CategoryPage }) => ({
    default: CategoryPage,
  })),
);
export const DigitalProductsPage = lazy(() =>
  import("../pages/DigitalProductsPage").then(({ DigitalProductsPage }) => ({
    default: DigitalProductsPage,
  })),
);
export const FashionPage = lazy(() =>
  import("../pages/FashionPage").then(({ FashionPage }) => ({
    default: FashionPage,
  })),
);
export const FeaturedOffersPage = lazy(() =>
  import("../pages/FeaturedOffersPage").then(({ FeaturedOffersPage }) => ({
    default: FeaturedOffersPage,
  })),
);
export const HomeUtilitiesPage = lazy(() =>
  import("../pages/HomeUtilitiesPage").then(({ HomeUtilitiesPage }) => ({
    default: HomeUtilitiesPage,
  })),
);
export const OffersPage = lazy(() =>
  import("../pages/OffersPage").then(({ OffersPage }) => ({
    default: OffersPage,
  })),
);
export const PetsPage = lazy(() =>
  import("../pages/PetsPage").then(({ PetsPage }) => ({ default: PetsPage })),
);
export const ProductPage = lazy(() =>
  import("../pages/ProductPage").then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);
export const ProductsPage = lazy(() =>
  import("../pages/ProductsPage").then(({ ProductsPage }) => ({
    default: ProductsPage,
  })),
);
export const SubcategoryPage = lazy(() =>
  import("../pages/SubcategoryPage").then(({ SubcategoryPage }) => ({
    default: SubcategoryPage,
  })),
);
export const TechnologyPage = lazy(() =>
  import("../pages/TechnologyPage").then(({ TechnologyPage }) => ({
    default: TechnologyPage,
  })),
);

export const AdminBlogFormPage = lazy(() =>
  import("../pages/admin/AdminBlogFormPage").then(({ AdminBlogFormPage }) => ({
    default: AdminBlogFormPage,
  })),
);
export const AdminBlogPage = lazy(() =>
  import("../pages/admin/AdminBlogPage").then(({ AdminBlogPage }) => ({
    default: AdminBlogPage,
  })),
);
export const AdminCategoryFormPage = lazy(() =>
  import("../pages/admin/AdminCategoriesFormPage").then(
    ({ AdminCategoryFormPage }) => ({ default: AdminCategoryFormPage }),
  ),
);
export const AdminCategoriesPage = lazy(() =>
  import("../pages/admin/AdminCategoriesPage").then(
    ({ AdminCategoriesPage }) => ({ default: AdminCategoriesPage }),
  ),
);
export const AdminDashboardPage = lazy(() =>
  import("../pages/admin/AdminDashboarPage").then(({ AdminDashboardPage }) => ({
    default: AdminDashboardPage,
  })),
);
export const AdminMarketplaceFormPage = lazy(() =>
  import("../pages/admin/AdminMarketplaceFormPage").then(
    ({ AdminMarketplaceFormPage }) => ({ default: AdminMarketplaceFormPage }),
  ),
);
export const AdminMarketplacesPage = lazy(() =>
  import("../pages/admin/AdminMarketplacesPage").then(
    ({ AdminMarketplacesPage }) => ({ default: AdminMarketplacesPage }),
  ),
);
export const AdminProductsFormPage = lazy(() =>
  import("../pages/admin/AdminProductsFormPage").then(
    ({ AdminProductsFormPage }) => ({ default: AdminProductsFormPage }),
  ),
);
export const AdminProductsPage = lazy(() =>
  import("../pages/admin/AdminProductsPage").then(({ AdminProductsPage }) => ({
    default: AdminProductsPage,
  })),
);
export const AdminSubcategoriesPage = lazy(() =>
  import("../pages/admin/AdminSubcategoriesPage").then(
    ({ AdminSubcategoriesPage }) => ({ default: AdminSubcategoriesPage }),
  ),
);
export const AdminSubcategoryFormPage = lazy(() =>
  import("../pages/admin/AdminSubcategoryFormPage").then(
    ({ AdminSubcategoryFormPage }) => ({ default: AdminSubcategoryFormPage }),
  ),
);
