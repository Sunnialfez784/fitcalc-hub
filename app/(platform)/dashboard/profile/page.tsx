import { getProfile } from "@/features/dashboard/services";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Profile",
  description: "Edit your FitCalc Hub profile.",
  path: "/dashboard/profile",
  noIndex: true,
});

export default async function DashboardProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Photo, body stats, activity level, fitness goal, and units.
        </p>
      </header>
      <ProfileForm profile={profile} />
    </div>
  );
}
