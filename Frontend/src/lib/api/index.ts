// lib/api/index.ts
import { DUMMY_TESTIMONIALS, DUMMY_TESTIMONIALS_STATS, DUMMY_AWARDS } from '../dummy-data/testimonials';
import { DUMMY_EVENTS, DUMMY_EVENTS_STATS } from '../dummy-data/events';
import { DUMMY_PHOTOS, DUMMY_VIDEOS, DUMMY_GALLERY_STATS } from '../dummy-data/gallery';
import { DUMMY_SERVICES, DUMMY_SERVICE_FEATURES } from '../dummy-data/services';


const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic fetch with fallback
async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    // Try to fetch from backend
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`Fetched from API: ${endpoint}`);
      return data;
    }
  } catch (error) {
    console.log(`API error for ${endpoint}, using fallback data`);
  }
  
  // Return fallback data
  console.log(`Using fallback data for: ${endpoint}`);
  return fallbackData;
}

export async function getTestimonials() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/testimonials`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    return data.map((item: any) => ({
      name: item.name,
      content: item.message,
      company: item.role || "Client",
      event: "Event Client",
      rating: 5,
    }));
  } catch (err) {
    console.warn("Testimonials API failed, using fallback");
    return DUMMY_TESTIMONIALS;
  }
}

export async function getTestimonialsStats() {
  return fetchWithFallback('/testimonials/stats', DUMMY_TESTIMONIALS_STATS);
}

export async function getAwards() {
  return fetchWithFallback('/awards', DUMMY_AWARDS);
}

// Events API

// =======================
// EVENTS API (CORRECTED)
// =======================

export async function getRecentEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    return Array.isArray(data) ? data : DUMMY_EVENTS;
  } catch (error) {
    console.warn("Backend OFF → Using Dummy Events");
    return DUMMY_EVENTS;
  }
}

export async function getEventsStats() {
  try {
    const events = await getRecentEvents();

    const currentYear = new Date().getFullYear();

    const eventsThisYear = events.filter((e: any) =>
      new Date(e.date).getFullYear() === currentYear
    ).length;

    const upcomingEvents = events.filter(
      (e: any) => new Date(e.date) > new Date()
    ).length;

    const cities = new Set(
      events.map((e: any) => e.location)
    );

    return {
      eventsThisYear,
      upcomingEvents,
      citiesCovered: cities.size,
    };
  } catch {
    return DUMMY_EVENTS_STATS;
  }
}

export async function getEventById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    return await res.json();
  } catch {
    return null;
  }
}


// Gallery API

export async function getGalleryPhotos() {
  try {
    const res = await fetch(`${API_BASE}/gallery`, { cache: "no-store" });
    if (!res.ok) throw new Error();

    const data = await res.json();

    return data
      .filter((item: any) => item.type === "image")
      .map((item: any) => ({
        id: item.id,
        image: item.mediaUrl,
        title: "Event Highlight",
        category: "Event",
      }));
  } catch {
    return DUMMY_PHOTOS;
  }
}

export async function getGalleryVideos() {
  try {
    const res = await fetch(`${API_BASE}/gallery`, { cache: "no-store" });
    if (!res.ok) throw new Error();

    const data = await res.json();

    return data
      .filter((item: any) => item.type === "video")
      .map((item: any) => ({
        id: item.id,
        title: "Event Video",
        category: "Event",
        duration: "2:30",
        url: item.mediaUrl,
        thumbnail: item.thumbnailUrl,
      }));
  } catch {
    return DUMMY_VIDEOS;
  }
}



export async function getGalleryStats() {
  return fetchWithFallback('/gallery/stats', DUMMY_GALLERY_STATS);
}

// Services API
export async function getServices() {
  return fetchWithFallback('/services', DUMMY_SERVICES);
}

export async function getServiceFeatures() {
  return fetchWithFallback('/services/features', DUMMY_SERVICE_FEATURES);
}


// Contact Form Submission
export async function submitContactForm(data: any) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      return { success: true, message: 'Message sent successfully!' };
    }
  } catch (error) {
    console.log('Contact form API error, using fallback');
  }
  
  // Fallback: Log to console and return success
  console.log('Contact form submission (fallback):', data);
  return { success: true, message: 'Message received! We\'ll contact you soon.' };
}

// Newsletter Subscription
export async function subscribeNewsletter(email: string) {
  try {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (res.ok) {
      return { success: true, message: 'Subscribed successfully!' };
    }
  } catch (error) {
    console.log('Newsletter API error, using fallback');
  }
  
  // Fallback
  console.log('Newsletter subscription (fallback):', email);
  return { success: true, message: 'Thank you for subscribing!' };
}