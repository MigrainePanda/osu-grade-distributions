export type OptionType = {
    label: string | null;
    value: string | null;
}

export type OptionsType = Array<OptionType>;

export type ValueType = OptionType | OptionsType | null | void;