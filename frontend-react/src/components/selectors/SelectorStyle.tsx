const cssStyles = getComputedStyle(document.body);

const textColor = cssStyles.getPropertyValue("--text-color");
const backgroundColor = cssStyles.getPropertyValue("--background-color");
const borderRadius = cssStyles.getPropertyValue("--border-radius");

const customStyles = {
    control: (base) => ({
        ...base,
        background: backgroundColor,
        borderRadius: borderRadius,
        borderColor: "lightgrey",
    }),
    menu: (base) => ({
        ...base,
        background: backgroundColor,
        borderRadius: borderRadius,
        marginTop: "0.5rem",
    }),
    menuList: (base) => ({
        ...base,
        padding: "1rem",
    }),
    option: (base, state) => ({
        ...base,
        borderRadius: borderRadius,
        backgroundColor: state.isDisabled
            ? undefined
            : state.isFocused
            ? "lightblue"
            : state.isSelected
            ? "lightgrey"
            : undefined,
        color: textColor,
    }),
};

export default customStyles;
