import { Container } from "@/components/layout/container";
import { SkeletonLoader } from "@/components/shared/skeleton";

export default function Loading() {
  return (
    <Container className="py-16">
      <SkeletonLoader rows={6} />
    </Container>
  );
}
