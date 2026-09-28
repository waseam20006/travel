import { TripPackage } from '@/types';

export const initialTrips: TripPackage[] = [
  {
    id: 'trip-1',
    title: {
      en: 'Historic Wonders of Rome & Vatican',
      ar: 'عجائب روما التاريخية والفاتيكان'
    },
    city: 'Rome',
    country: {
      en: 'Italy',
      ar: 'إيطاليا'
    },
    price: 5420,
    durationDays: 10,
    category: 'europe',
    image: '/assets/images/destination/dest1.jpg',
    rating: 4.9,
    reviewsCount: 128,
    description: {
      en: 'Immerse yourself in ancient Roman heritage, walk inside the Colosseum, marvel at the Sistine Chapel, and savor authentic Italian culinary delights.',
      ar: 'انغمس في التراث الروماني العريق، وتجول داخل الكولوسيوم، وشاهد روعة كنيسة سيستينا مع تذوق أشهى المأكولات الإيطالية الأصيلة.'
    },
    featured: true,
    availableSeats: 15
  },
  {
    id: 'trip-2',
    title: {
      en: 'Iconic London Landmarks & Thames Cruise',
      ar: 'معالم لندن الخلابة وجولة نهر التايمز'
    },
    city: 'London',
    country: {
      en: 'UK',
      ar: 'المملكة المتحدة'
    },
    price: 4200,
    durationDays: 12,
    category: 'europe',
    image: '/assets/images/destination/dest2.jpg',
    rating: 4.8,
    reviewsCount: 94,
    description: {
      en: 'Explore Big Ben, Buckingham Palace, the British Museum, and the vibrant arts and theatre life of the United Kingdom capital.',
      ar: 'استكشف ساعة بيغ بن، قصر باكنغهام، المتحف البريطاني، وأجواء الفنون والمسرح في قلب العاصمة البريطانية نابضة بالحياة.'
    },
    featured: true,
    availableSeats: 22
  },
  {
    id: 'trip-3',
    title: {
      en: 'Grand Full Europe Grand Tour',
      ar: 'الجولة الكبرى في أنحاء أوروبا'
    },
    city: 'Paris, Zurich & Vienna',
    country: {
      en: 'Full Europe',
      ar: 'أوروبا الشاملة'
    },
    price: 15000,
    durationDays: 28,
    category: 'cultural',
    image: '/assets/images/destination/dest3.jpg',
    rating: 5.0,
    reviewsCount: 65,
    description: {
      en: 'The definitive European odyssey taking you across France, the Swiss Alps, Austria, and romantic canals with VIP transit and luxury stays.',
      ar: 'الرحلة الأوروبية المتكاملة عبر فرنسا وجبال الألب السويسرية والنمسا والقنوات المائية الرومانسية مع إقامة فندقية وتنقلات خمس نجوم.'
    },
    featured: true,
    availableSeats: 8
  },
  {
    id: 'trip-4',
    title: {
      en: 'Santorini Sunset & Aegean Odyssey',
      ar: 'غروب سانتوريني ورحلة بحر إيجه الساحرة'
    },
    city: 'Santorini',
    country: {
      en: 'Greece',
      ar: 'اليونان'
    },
    price: 3800,
    durationDays: 7,
    category: 'beach',
    image: '/assets/images/booking/booking-img.jpg',
    rating: 4.95,
    reviewsCount: 210,
    description: {
      en: 'Breathtaking cliffside whitewashed architecture, crystal Aegean waters, private catamaran sailing, and world-famous romantic sunsets.',
      ar: 'منازل بيضاء منحوتة في الجرف الصخري، ومياه فيروزية متلألئة، وإبحار في قارب كروز خاص مع أجمل مشهد غروب شمس في العالم.'
    },
    featured: true,
    availableSeats: 12
  },
  {
    id: 'trip-5',
    title: {
      en: 'Tokyo & Kyoto Cultural Odyssey',
      ar: 'رحلة الثقافة والطبيعة في طوكيو وكيوتو'
    },
    city: 'Tokyo',
    country: {
      en: 'Japan',
      ar: 'اليابان'
    },
    price: 6800,
    durationDays: 14,
    category: 'asia',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviewsCount: 155,
    description: {
      en: 'Experience the harmony between cutting-edge technology and centuries-old Zen temples, bamboo groves, and authentic culinary heritage.',
      ar: 'تجربة فريدة تجمع بين التكنولوجيا المتطورة والمعابد التراثية الهادئة وغابات الخيزران الساحرة مع المطبخ الياباني الفاخر.'
    },
    featured: false,
    availableSeats: 18
  },
  {
    id: 'trip-6',
    title: {
      en: 'Swiss Alps Hiking & Glacier Express',
      ar: 'مغامرة جبال الألب السويسرية وقطار الجليد'
    },
    city: 'Zermatt',
    country: {
      en: 'Switzerland',
      ar: 'سويسرا'
    },
    price: 7200,
    durationDays: 9,
    category: 'adventure',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    reviewsCount: 88,
    description: {
      en: 'Alpine adventures beneath the Matterhorn, scenic glacier train routes, crystal mountain lakes, and traditional Swiss fondue experiences.',
      ar: 'مغامرة جبلية خلابة تحت قمة ماترهورن، ورحلة قطار الجليد البانورامي بين البحيرات النقية وألذ تجارب الفوندو السويسري.'
    },
    featured: false,
    availableSeats: 10
  }
];
