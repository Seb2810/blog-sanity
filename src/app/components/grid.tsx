import { GridRow } from "../types/types";

type Props = {
  data: GridRow;
};

export function GridRowComponent({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      {data.columns.map((col, i) => (
        <div key={i}>
          <h3 className="font-bold mb-2">{col.title}</h3>
          <ul className="space-y-1">
            {col.links?.map((link, j) => (
              <li key={j}>
                <a
                  href={`/${link.slug.current}`}
                  className="text-blue-600 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

