// ./components/CountrySelect.tsx
import { useMemo } from "react";
import SearchableSelect from "./SearchableSelect";
import data from "../../lib/countryData.json";
import { StringInputProps } from "sanity";

export default function SelectCountry(props: StringInputProps) {
    const options = useMemo(() => {
        return data.map((c) => ({
            value: c.name,
            title: c.name,
            emoji: c.emoji,
        }));
    }, []);

    return <SearchableSelect {...props} options={options} />;
}
