import { Autocomplete } from "@sanity/ui";
import { set, unset, StringInputProps, SanityDocument } from "sanity";

type Option = {
    value: string;
    title: string;
    emoji?: string;
};

type Props = StringInputProps & {
    options: Option[];
    document?: SanityDocument;
};

export default function SearchableSelect(props: Props) {
    const { value, onChange, options, elementProps } = props;
    return (
        <Autocomplete
            {...elementProps}
            options={options}
            value={value}
            onChange={(val) => onChange(val ? set(val) : unset())}
            renderOption={(option) => (
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <span>{option.emoji}</span>
                    <span>{option.title}</span>
                </div>
            )}
            renderValue={(value: string, option?: Option) => {
                if (!option) return value;

                return `${option.emoji ?? ""} ${option.title}`;
            }}
        />
    );
}
