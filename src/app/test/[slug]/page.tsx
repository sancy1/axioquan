
// src/app/test/[slug]/page.tsx
export default function TestPage({ params }: { params: { slug: string } }) {
  return <div>Slug: {params.slug}</div>
}