export const colorsChart = [
    "Red",
    "mistyrose",
    "Yellow",
    "Green",
    "lavender",
    "Orange",
    "Grey",
    "Lime",
    "Teal",
    "Maroon",
    "Navy",
    "Blue",
    "Silver",
    "Gold",
    "greenyellow",
    "floralwhite",
    "Magenta",
    "Indigo",
];

export const chartTypes = (handleChangeChartType,defaulValue = null) => {
    return (
        <select type="input" className="optionsChart" placeholder="Chart Type"
            onChange={handleChangeChartType}
            defaultValue={defaulValue} 
            >
            <option value="Bar">Bar</option>
            <option value="Pie">Pie</option>
            <option value="Lines">Lines</option>
            <option value="Polar">Polar</option>
        </select>)
};