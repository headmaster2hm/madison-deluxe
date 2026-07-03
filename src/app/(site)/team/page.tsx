import Link from "next/link";
import TeamMemberCard from "@/components/TeamMemberCard";
import { teamMembers } from "@/data/team";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Madison Deluxe Spa & Wellness Center",
  description:
    "Meet the licensed massage therapists and wellness experts at Madison Deluxe Spa & Wellness Center in Madison, WI.",
};

export default function TeamPage() {
  return (
    <>
      <section className="section-padding mx-auto max-w-7xl text-center">
        <p className="subheading">Meet the Experts</p>
        <h1 className="heading-serif mt-3">Our Team of Experts</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sage-600">
          Our licensed therapists bring years of training and a genuine passion for
          healing. Each member of our team specializes in a distinct massage discipline,
          so you always receive care from a true expert.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12 lg:px-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section className="bg-sage-100/50 section-padding text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-sage-800 md:text-4xl">
            Book with Your Preferred Therapist
          </h2>
          <p className="mt-4 text-sage-600">
            Request a specific therapist when you book, or let us match you with
            the specialist best suited to your needs.
          </p>
          <Link href="/book" className="btn-primary mt-8">
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
