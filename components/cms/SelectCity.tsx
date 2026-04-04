// ./components/StateSelect.tsx
import { useMemo } from "react";
import SearchableSelect from "./SearchableSelect";
import data from "../../lib/countryData.json";
import { SanityDocument, StringInputProps, useFormValue } from "sanity";

type Props = StringInputProps & {
    document?: SanityDocument;
};

export default function SelectCity(props: Props) {
    const country = useFormValue(["location"]);

    const options = useMemo(() => {
        const c = data.find((c) => c.name === country);
        if (!c) return [];

        function normalize(str: string) {
            return str
                .normalize("NFD") // split accents
                .replace(/[\u0300-\u036f]/g, ""); // remove them
        }

        return c.states.map((s) => {
            return {
                value: normalize(s.name),
                title: normalize(s.name),
            };
        });
    }, [country]);

    return <SearchableSelect {...props} options={options} />;
}
