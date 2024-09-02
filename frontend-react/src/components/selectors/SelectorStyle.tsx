const cssStyles = getComputedStyle(document.body);

const textColor = cssStyles.getPropertyValue('--text-color');
const backgroundColor = cssStyles.getPropertyValue('--background-color');
const borderRadius = cssStyles.getPropertyValue('--border-radius');

const customStyles = {
    control: (base, state) => ({
      ...base,
      background: backgroundColor,
      borderRadius: state.isFocused ? borderRadius : borderRadius,
      borderColor: state.isFocused ? "lightgrey" : "lightgrey",
    }),
    menu: base => ({
        ...base,
        background: backgroundColor,
        color: textColor,
        borderRadius: borderRadius,
        marginTop: "0.5rem",
    }),
    menuList: base => ({
        ...base,
        padding: "1rem",
    }),
    option: (base, state) => ({
        ...base,
        borderRadius: borderRadius,
        backgroundColor: 
            state.isDisabled
            ? undefined
            : state.isSelected
            ? textColor
            : state.isFocused
            ? "lightblue" 
            : undefined
    })
};

export default customStyles;