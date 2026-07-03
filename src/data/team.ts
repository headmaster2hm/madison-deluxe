export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  image: string;
  imageAlt: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "elena-vasquez",
    name: "Elena Vasquez",
    title: "Lead Massage Therapist",
    specialty: "Swedish & Therapeutic Massage",
    bio: "With over 12 years of experience, Elena leads our massage team with a calm, intuitive touch. She specializes in full-body relaxation and customized therapeutic sessions tailored to each guest.",
    image: "/images/team/elena-vasquez.png",
    imageAlt: "Elena Vasquez, Lead Massage Therapist at Madison Deluxe",
  },
  {
    id: "cecilia-moreno",
    name: "Cecilia Moreno",
    title: "Deep Tissue Specialist",
    specialty: "Deep Tissue & Holistic Massage",
    bio: "Cecilia is known for her skill in releasing chronic tension and restoring mobility. Her holistic approach blends deep tissue work with mindful breathing techniques for lasting relief.",
    image: "/images/team/cecilia-moreno.png",
    imageAlt: "Cecilia Moreno, Deep Tissue Specialist at Madison Deluxe",
  },
  {
    id: "mei-lin",
    name: "Mei Lin",
    title: "Oriental Bodywork Practitioner",
    specialty: "Shiatsu & Acupressure Massage",
    bio: "Trained in traditional East Asian bodywork, Mei brings precision and balance to every session. She excels in shiatsu, acupressure, and meridian-based therapies for whole-body harmony.",
    image: "/images/team/mei-lin.png",
    imageAlt: "Mei Lin, Oriental Bodywork Practitioner at Madison Deluxe",
  },
  {
    id: "sophia-reed",
    name: "Sophia Reed",
    title: "Sports & Recovery Therapist",
    specialty: "Sports Massage & Aromatherapy",
    bio: "Sophia helps active clients recover faster and move with ease. Her dynamic sports massage techniques are complemented by custom aromatherapy blends for deep muscular recovery.",
    image: "/images/team/sophia-reed.png",
    imageAlt: "Sophia Reed, Sports & Recovery Therapist at Madison Deluxe",
  },
];
