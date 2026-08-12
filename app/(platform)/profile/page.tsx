import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

/** Legacy /profile → /dashboard/profile */
export default function ProfileRedirectPage() {
  redirect(ROUTES.dashboardProfile);
}
