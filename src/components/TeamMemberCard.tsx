import Image from "next/image";
import type { TeamMember } from "@/data/team";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-sm transition-all duration-300 hover:border-sage-300 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-sage-100">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/50 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
          {member.specialty}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-sage-800">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-sage-600">{member.title}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-sage-600">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
