import coffee from '../photos/coffee.jpeg'

export interface ProjectItem {
  id: string
  title: string
  description: string
  category: string
  image: string
  slug: string
  videoSrc: string
}

/**
 * Homepage featured projects — curated, max 5.
 * Edit this array to change what appears on the homepage.
 * This does NOT affect the ALLProjects page.
 */
export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: '01',
    title: 'How to Make Viral Videos',
    description:
      'A deep-dive into the art and science behind viral short-form content that captures millions of views.',
    category: 'Client Project',
    image:
      'https://res.cloudinary.com/zrwhcw4t/image/upload/v1784721522/WhatsApp_Image_2026-07-22_at_5.28.21_PM_tqkzjh.jpg',
    slug: 'viral-videos',
    videoSrc:
      'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784721272/short_full_sample_1_yy4ss1.mp4',
  },
  {
    id: '02',
    title: 'Roasted Coffee',
    description:
      'A cinematic product shoot capturing the warmth, aroma, and craft behind every cup of roasted coffee.',
    category: 'Brand Project',
    image: coffee,
    slug: 'roasted-coffee',
    videoSrc:
      'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784054538/Roasted_Coffee_shoot_dwbczb.mp4',
  },
  {
    id: '03',
    title: 'Teach Marketing Video',
    description:
      'Educational marketing content designed to inform, engage, and convert viewers into action-takers.',
    category: 'Client Project',
    image:
      'https://res.cloudinary.com/zrwhcw4t/image/upload/v1784722122/WhatsApp_Image_2026-07-22_at_5.38.23_PM_vnzpbg.jpg',
    slug: 'teach-marketing',
    videoSrc:
      'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784721974/WEP_GIG_249EDIT_kjkakq.mp4',
  },
  {
    id: '04',
    title: 'Airsoft',
    description:
      'High-energy action edits showcasing the thrill and intensity of airsoft gameplay moments.',
    category: 'Client Project',
    image:
      'https://res.cloudinary.com/zrwhcw4t/image/upload/v1784724357/WhatsApp_Image_2026-07-22_at_6.15.33_PM_c14pxg.jpg',
    slug: 'airsoft',
    videoSrc:
      'https://res.cloudinary.com/zrwhcw4t/video/upload/v1784724089/20_AIRSOFT_fails_249edit_1_1_hxh7y3.mp4',
  },
]
