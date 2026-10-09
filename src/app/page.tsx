const profile = {
  name: "よしだことの",
  affiliation: "株式会社HRTheory",
  message: "コーギーのフランチェスカとの時間が好き",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm ring-1 ring-black/[.06] dark:bg-zinc-900 dark:ring-white/[.08]">
        <div className="flex flex-col items-center gap-6 text-center">
          <div
            aria-hidden="true"
            className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-5xl dark:bg-amber-900/40"
          >
            🐕
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-widest text-zinc-500 dark:text-zinc-400">
              PROFILE
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
              {profile.name}
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              {profile.affiliation}
            </p>
          </div>
          <blockquote className="w-full rounded-2xl bg-zinc-50 px-6 py-5 text-lg leading-8 text-zinc-800 dark:bg-black/40 dark:text-zinc-200">
            「{profile.message}」
          </blockquote>
        </div>
      </main>
    </div>
  );
}
