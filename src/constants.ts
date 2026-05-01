/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Full-Stack Web Development Masterclass',
    instructor: 'Dr. Angela Yu',
    price: 94.99,
    rating: 4.8,
    reviews: 1250,
    image: 'https://picsum.photos/seed/coding/800/600',
    category: 'Development',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Advanced UI/UX Design Principles',
    instructor: 'Gary Simon',
    price: 84.99,
    rating: 4.9,
    reviews: 850,
    image: 'https://picsum.photos/seed/design/800/600',
    category: 'Design',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'Data Science with Python & R',
    instructor: 'Jose Portilla',
    price: 79.99,
    rating: 4.7,
    reviews: 2100,
    image: 'https://picsum.photos/seed/data/800/600',
    category: 'Data Science',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Professional Photography for Beginners',
    instructor: 'Annie Leibovitz',
    price: 59.99,
    rating: 4.6,
    reviews: 450,
    image: 'https://picsum.photos/seed/photo/800/600',
    category: 'Lifestyle',
    level: 'Beginner'
  },
  {
    id: '5',
    title: 'Digital Marketing Excellence 2024',
    instructor: 'Neil Patel',
    price: 69.99,
    rating: 4.5,
    reviews: 3200,
    image: 'https://picsum.photos/seed/marketing/800/600',
    category: 'Business',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Machine Learning A-Z: Hands-On Python',
    instructor: 'Kirill Eremenko',
    price: 109.99,
    rating: 4.8,
    reviews: 5600,
    image: 'https://picsum.photos/seed/ai/800/600',
    category: 'Data Science',
    level: 'Advanced'
  }
];

export const CATEGORIES = [
  'All',
  'Development',
  'Design',
  'Data Science',
  'Business',
  'Lifestyle'
];
