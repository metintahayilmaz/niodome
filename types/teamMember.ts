export type TeamMemberSocial = {
  platform: string;
  href: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  /** urlFor ile dönüştürülmüş 800x800 URL — yoksa undefined */
  photo?: string;
  socials: TeamMemberSocial[];
};
