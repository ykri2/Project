export const getSumYears = (data, callback) => {

    const all_dates = data.map((d) => {
        return d.dato.slice(0, 4)
    })
    let unique = [...new Set(all_dates)];

    const years = unique.map((u) => {

        let rest = 0;
        let total_payed = 0;
        let total_int = 0;
        let total_inn = 0;
        let year = "";                

        for(let i = 0; i <= data.length - 1; i++) {
            let temp_year = data[i].dato.slice(0, 4)
            if(temp_year === u) {
                rest = data[i].restgjeld;
                total_payed += data[i].total;
                total_int += data[i].renter;
                total_inn += data[i].innbetaling;
                year = temp_year;
            }
        }
        
        const year_obj = {};
        year_obj['restgjeld'] = rest;
        year_obj['betalt'] = total_payed;
        year_obj['renter'] = total_int;
        year_obj['innbetaling'] = total_inn;
        year_obj['dato'] = year;
        
        return year_obj;
    })


    return callback(years)

}