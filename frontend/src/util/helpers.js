export function fileToDataUrl(file) {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    console.log(file.type);
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
        throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
}

// function to convert category names in frontend to backend table names
export function convertCategoryName(category) {
    
    switch(category) {
        case "Case":
            return "Cases"
        case "Motherboard":
            return "Motherboards"
        case "Graphics Cards":
        case "Graphics Card":
            return "Graphics_Cards"
        case "Power Supplies":
        case "Power Supply":
            return "PSU"
        case "CPU Cooling":
        case "CPU Cooler":
            return "CPU_Cooling"
        case "PC Cooling":
            return "PC_Cooling"
        case 'Wifi Adaptors':
            return 'Wifi_Adaptors'
        default:
            return category;
    
    }

}

export function generateBuildString() {
    return Math.random().toString(36).slice(2);
}