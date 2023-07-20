"use client";

import { Color, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";
import qs from "query-string";
import Button from "@/components/ui/button";
import { cn } from "@/lib/util";

interface FilterProps {
  data: (Size | Color)[];
  valuekey: string;
  name: string;
}

const Filter: FC<FilterProps> = ({ data, valuekey, name }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valuekey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valuekey]: id,
    };

    if (current[valuekey] === id) {
      query[valuekey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                `rounded-md text-sm text-gray-800 p-2 bg-white 
                border border-gray-300`,
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
