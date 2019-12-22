// Ports to run on
export const PORT = process.env.PORT || 4000;

// Job setup
const minutes = 1;
export const INTERVAL = minutes * 60 * 1000;

// Locations
export const LOCATIONS: {[id: number]: string} = {
    505: "Ruse War Field",
    510: "Gian Point",
    550: "Nsu Grid",
    551: "Ganalen's Grave",
    552: "Rya",
    553: "Flexa",
    554: "H-2 Cloud",
    555: "R-9 Cloud",
};
