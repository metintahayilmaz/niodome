/**
 * Team member seed data — about-us TeamGrid bölümü için.
 * Görseller: public/img/avatars/ dizininden alınır.
 */

export type SeedTeamMemberSocial = {
  platform: string;
  href: string;
};

export type SeedTeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string; // /img/avatars/... → seed sırasında public/ prefix ile yüklenir
  order: number;
  socials: SeedTeamMemberSocial[];
};

export const teamMembersData: SeedTeamMember[] = [
  {
    id: "helen-pineapple",
    name: "Helen Pineapple",
    role: "Co-founder & head of design",
    photo: "/img/avatars/800x800_ava-05.webp",
    order: 1,
    socials: [
      { platform: "Linkedin", href: "https://www.linkedin.com/" },
      { platform: "Behance",  href: "https://www.behance.net/" },
    ],
  },
  {
    id: "alex-tomato",
    name: "Alex Tomato",
    role: "SEO, Brand manager",
    photo: "/img/avatars/800x800_ava-06.webp",
    order: 2,
    socials: [
      { platform: "Linkedin", href: "https://www.linkedin.com/" },
      { platform: "Behance",  href: "https://www.behance.net/" },
    ],
  },
  {
    id: "jenny-berry",
    name: "Jenny Berry",
    role: "Frontend Developer",
    photo: "/img/avatars/800x800_ava-07.webp",
    order: 3,
    socials: [
      { platform: "Linkedin", href: "https://www.linkedin.com/" },
      { platform: "Behance",  href: "https://www.behance.net/" },
    ],
  },
];
