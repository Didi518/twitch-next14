import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Tableau de Bord</h1>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
}
