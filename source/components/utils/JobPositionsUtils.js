// Replicate the Ruby page_path function logic for work_position
export const generatePagePath = (page) => {
  if (!page || !page?.slug) {
    return "/";
  }
  
  const ancestorPath = page?.ancestor_slug ? `${page.ancestor_slug}/` : "";
  const parentPath = page?.parent_slug ? `${page.parent_slug}/` : "";
  const localePrefix = page?.locale_prefix || "";
  
  return `/${ancestorPath}${parentPath}${localePrefix}${page.slug}`.replace(/\/+/g, '/');
};

// Filter job positions based on search term
export const filterJobPositions = (jobPositions, searchTerm) => {
  if (!jobPositions || !Array.isArray(jobPositions)) return [];
  if (!searchTerm) return jobPositions;
  
  const searchLower = searchTerm.toLowerCase();
  return jobPositions.filter(jobPosition => (
    jobPosition?.title?.toLowerCase()?.includes(searchLower) ||
    jobPosition?.subtitle?.toLowerCase()?.includes(searchLower) ||
    jobPosition?.description?.toLowerCase()?.includes(searchLower)
  ));
};

// Calculate pagination values
export const calculatePagination = (totalItems = 0, currentPage = 1, itemsPerPage = 10) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return { totalPages, startIndex, endIndex };
}; 