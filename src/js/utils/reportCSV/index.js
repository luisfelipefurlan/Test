// import moment from "moment";

const convertToCSV = (items, names) => {
    let array = typeof items !== "object" ? JSON.parse(items) : items;
    let str = "Estação, Data/Hora, Temperatura, Umidade, Vento, Chuva \r\n";
    Object.values(array).forEach(arr => {
        Object.values(arr.values).forEach(time => {
            let line = "";
            line += `${names[arr.id]},`;
            line += `${time.ts},`;
            line += `${time.atAvg} °C,`;
            line += `${time.rhAvg}%,`;
            line += `${time.wsMx} km/h,`;
            line += `${time.perHour} mm,`;

            str += line + "\r\n";
        });
    });

    return str;
};

export const exportCSVFile = (items, names) => {
    let csv = convertToCSV(items, names);
    let exportedFilenmae = "export.csv";
    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};
