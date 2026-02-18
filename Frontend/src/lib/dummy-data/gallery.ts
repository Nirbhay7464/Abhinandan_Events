// lib/dummy-data/gallery.ts
export const DUMMY_PHOTOS = [
  { id: 1, category: "Corporate", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070", title: "Tech Conference 2024" },
  { id: 2, category: "Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000", title: "Destination Wedding" },
  { id: 3, category: "Social", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000", title: "Charity Gala" },
  { id: 4, category: "Conference", image: "https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=2000", title: "Industry Summit" },
];

export const DUMMY_VIDEOS = [
  { id: 1, category: "Corporate", title: "Product Launch Highlights", duration: "2:30" },
  { id: 2, category: "Wedding", title: "Wedding Ceremony Moments", duration: "3:15" },
  { id: 3, category: "Social", title: "Birthday Celebration", duration: "1:45" },
  { id: 4, category: "Conference", title: "Conference Recap", duration: "4:20" },
];

export const DUMMY_GALLERY_STATS = {
  totalPhotos: 450,
  totalVideos: 85,
  categories: ["Corporate", "Weddings", "Social", "Conferences"]
};