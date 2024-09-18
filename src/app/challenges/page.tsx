import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ChallengeList from "@/components/specific/ChallengeList";
import type { Database } from "@/types/supabase";
import CategoryList from "@/components/specific/CategoryList";

export default async function ChallengesPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const [categoriesResponse, challengesResponse] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("challenges").select("*").order("points"),
  ]);

  const { data: categories, error: categoriesError } = categoriesResponse;
  const { data: challenges, error: challengesError } = challengesResponse;

  if (categoriesError || challengesError) {
    console.error("Error fetching data:", categoriesError || challengesError);
    return <div>Error loading challenges. Please try again later.</div>;
  }

  return <CategoryList categories={categories} />;
}
