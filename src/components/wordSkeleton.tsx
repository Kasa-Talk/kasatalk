export default function WordSkeleton() {
  return (
    <div>
      {[1, 2].map((index) => (
        <div className="bg-white rounded-md border p-4 max-w-4xl mx-auto mt-5 animate-pulse" key={index}>
          <div className="flex gap-3 items-center">
            <div className="h-6 w-36 mb-4 bg-slate-200 rounded"></div>
            <div className="h-6 w-8 mb-4 bg-slate-200 rounded"></div>
          </div>
          <div className="h-5 w-full bg-slate-200 rounded"></div>
          <div className="h-5 w-full bg-slate-200 rounded mt-2"></div>
        </div>
      ))}
    </div>
  );
}
