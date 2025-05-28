export default function TeamMemberCard({
  name,
  role,
  email,
  img,
}: {
  name: string;
  role: string;
  email: string;
  img: string;
}) {
  return (
    <div className="team-member-card">
      <img src={img} alt={name} className="team-img" />
      <div>
        <strong>{name}</strong>
        <div>{role}</div>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  );
}
