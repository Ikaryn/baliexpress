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

export const productDesc = {
    'Cases': "The computer case serves mainly as a way to physically mount and contain all of the actual components inside of a computer, like the motherboard, hard drive, optical drive, floppy disk drive, etc.",
    'Motherboards': "The motherboard is the main circuit board of your computer, f you ever open your computer, the biggest piece of silicon you see is the motherboard. Attached to the motherboard, you'll find the CPU, ROM, memory RAM expansion slots, PCI slots, and USB ports. It also includes controllers for devices like the hard drive, DVD drive, keyboard, and mouse. Basically, the motherboard is what makes everything in your computer work together.",
    'Graphics_Cards': "A graphics card is an expansion card for your PC that is responsible for rendering images to the display. High-end GPUs are used for gaming, ray tracing, graphics production, and even mining cryptocurrency.",
    'Memory': "RAM is short for “random access memory” and while it might sound mysterious, RAM is one of the most fundamental elements of computing. RAM is the super-fast and temporary data storage space that a computer needs to access right now or in the next few moments.",
    'Storage': "A hard disk drive (HDD) is a non-volatile computer storage device containing magnetic disks or platters rotating at high speeds. It is a secondary storage device used to store data permanently, random access memory (RAM) being the primary memory device. ... A hard disk drive is also known as a hard drive.",
    'PSU': "A power supply unit (PSU) converts mains AC to low-voltage regulated DC power for the internal components of a computer. Modern personal computers universally use switched-mode power supplies. Some power supplies have a manual switch for selecting input voltage, while others automatically adapt to the mains voltage.",
    "CPU_Cooling": "A CPU cooler is device designed to draw heat away from the system CPU and other components in the enclosure. Using a CPU cooler to lower CPU temperatures improves efficiency and stability of the system. Adding a cooling device, however, can increase the overall noise level of the system.",
    "CPU": "The CPU (Central Processing Unit) is the part of a computer system that is commonly referred to as the 'brains' of a computer. The CPU is also known as the processor or microprocessor. The CPU is responsible for executing a sequence of stored instructions called a program ."
}

export const buildTemplate = {
    'Cases': '', 
    'Motherboards':'', 
    'CPU':'',
    'Graphics_Cards':'', 
    'Memory': '',
    'Storage': '',
    'PSU': '', 
    'CPU_Cooling':'',
    }

export const allProductCategories = {
    'Cases': '', 
    'Motherboards':'', 
    'CPU':'',
    'Graphics_Cards':'', 
    'Memory': '',
    'Storage': '',
    'PSU': '', 
    'CPU_Cooling':'',
    
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

export function reverseCategoryName(category) {
    switch(category) {
        case "Cases":
            return "Case";
        case "Motherboards":
            return "Motherboard";
        case 'Graphics_Cards':
            return "Graphics Card";
        case 'PSU':
            return "Power Supply";
        case "CPU_Cooling":
            return "CPU Cooling";
        default: 
            return category;
    }
}

export function generateBuildString() {
    return Math.random().toString(36).slice(2);
}