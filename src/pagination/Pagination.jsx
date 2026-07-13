import { useMemo } from 'react';

function Pagination({ page, setPage, totalPages, maxVisible = 1 }) {
  const pages = useMemo(() => {
    const tp = Number(totalPages) || 0;
    const current = Math.min(Math.max(Number(page) || 1, 1), Math.max(tp, 1));
    const maxNums = Math.max(3, maxVisible);

    if (tp <= 1) return [1];
    if (tp <= maxNums) return Array.from({ length: tp }, (_, i) => i + 1);

    const result = [];

    result.push(1);

    const middleCount = maxNums - 2;

    const left = Math.floor(middleCount / 2);
    const right = middleCount - left;

    let start = current - left;
    let end = current + right - 1;

    if (start < 2) {
      start = 2;
      end = start + middleCount - 1;
    }
    if (end > tp - 1) {
      end = tp - 1;
      start = end - middleCount + 1;
    }

    if (start > 2) result.push('...');

    for (let i = start; i <= end; i++) result.push(i);

    if (end < tp - 1) result.push('...');

    result.push(tp);

    return result;
  }, [page, totalPages, maxVisible]);

  const current = Math.min(
    Math.max(Number(page) || 1, 1),
    Math.max(Number(totalPages) || 1, 1)
  );
  const tp = Math.max(Number(totalPages) || 1, 1);

  const goTo = (p) => {
    const next = Math.min(Math.max(p, 1), tp);
    setPage(next);
  };

  return (
    <div className="my-3 flex items-center justify-center gap-3" dir="rtl">
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        disabled={current === 1}
        className="flex size-8 cursor-pointer items-center justify-center rounded-[7px] bg-[#f35714] px-4 py-2 text-white hover:bg-[#f35714]/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {`<`}
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p, index) => {
          if (p === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="px-2 text-white/80 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = p === current;

          return (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex size-8 cursor-pointer items-center justify-center rounded-[7px] border border-[#f35714] px-3 py-2 text-white transition ${isActive ? 'bg-[#f35714]' : 'hover:bg-[#f35714]/20'}`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => goTo(current + 1)}
        disabled={current === tp}
        className="flex size-8 cursor-pointer items-center justify-center rounded-[7px] bg-[#f35714] px-4 py-2 text-white hover:bg-[#f35714]/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {`>`}
      </button>
    </div>
  );
}

export default Pagination;
