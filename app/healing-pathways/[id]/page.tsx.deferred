import { getPathwayById, healingPathways } from '../../../src/data/healingPathways';
import PathwayDetailClient from '../../../src/components/PathwayDetailClient';

export async function generateStaticParams() {
  return healingPathways.map((pathway) => ({
    id: pathway.id,
  }));
}

export default function PathwayDetailPage({ params }: { params: { id: string } }) {
  const pathway = getPathwayById(params.id);

  if (!pathway) {
    return null;
  }

  return <PathwayDetailClient pathway={pathway} />;
}
