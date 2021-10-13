var cat_stats = ["Rk", "Temp", "Jugador", "G", "MP",  "PTS", "REB", "AST", "OREB", "DREB", "STL", "BLK", "FG", "FGA", "FG%", "eFG%", "FT", "FTA", "FT%", "TS%", "TOV", "PF"]

function Filter(stat, operator, value)
{
    this.stat = stat;
    this.operator = operator;
    this.value = value;
}

function parseData(data)
{
    var since = parseFloat( document.getElementById("season-since-filter").value.split('-')[0]);
    var to_ = parseFloat( document.getElementById("season-to-filter").value.split('-')[0]);

    var stats = []
    Object.keys(data).forEach(season =>
        {
            season_float = parseFloat(season)
            if(season_float >= since && season_float <= to_)
                parseSeasonStats(data[season], season_float, stats)
        });

    return stats;
}

function research(stats, filters)
{
    return stats.filter(function(element)
    {
        return filters.every(filter =>
            {
                var perGame = false;
                var the_stat = filter.stat.split('/')[0];
                if(filter.stat.indexOf('/') != -1)
                    perGame = true;

                if(!perGame)
                    the_stat = the_stat.split(' ')[0];

                if(isNaN(element[the_stat]))
                    return false;

                
                var g = 1;
                if(perGame)
                    g = element.G;

                if(the_stat == "G")
                    g = 1;

                if(filter.operator == 'greater_equal')
                    return element[the_stat]/g.toFixed(1) >= filter.value;

                if(filter.operator == 'minor')
                    return element[the_stat]/g.toFixed(1) < filter.value;

                if(filter.operator == 'equal')
                    return element[the_stat]/g.toFixed(1) == filter.value;

            });
    });
}

function print_table(bodyTable, result)
{
    var perGame = document.getElementById("statsPerGameRadio").checked;
    var rk = 1;
        result.slice(0, 50).forEach(register => 
        {
            var tr = document.createElement("tr");
            var tr = document.createElement("tr");
            register['Rk'] = rk;
            register['Temp'] = register.season;
            register['Jugador'] = register.name;
            rk++;
            cat_stats.forEach(stat=>
                {
                    var td = document.createElement("td")
                    var g = 1;
                    if(perGame)
                        g = register.G;

                    if(stat.indexOf("%") != -1)
                        g = 1;

                    var to_fixed = 0;
                    if(perGame)
                        to_fixed = 1;

                    if(stat != 'Rk' && stat != "Temp" && stat != 'Jugador' && stat != 'G')
                    {
                        if(isNaN(register[stat]))
                            td.innerHTML = "-"
                        else
                            td.innerHTML = (register[stat]/g).toFixed(to_fixed);
                    }
                    else
                        td.innerHTML = register[stat];

                    tr.appendChild(td)
                }
                );

            bodyTable.appendChild(tr);
        });

}

function showResult(result, filters)
{
    document.getElementById("my_table").innerHTML = '<thead id="table_head"></thead><tbody id="table_body"></tbody>';

    var head = document.getElementById("table_head");
    var body = document.getElementById("table_body");
    

    var trh = document.createElement("tr");
    cat_stats.forEach(element=>
        {
            var td = document.createElement("td");
            td.innerHTML = element;
            trh.appendChild(td);
            return 1;
        });
    head.appendChild(trh);

    var order_by_perGame = false;
    var statOrder = document.getElementById("order_by").value;
    if(statOrder.indexOf('/') != -1)
        order_by_perGame = true;

    statOrder = statOrder.split('/')[0]
    statOrder = statOrder.split(' ')[0]
    print_table(body, result.sort(function(a, b){ 
        var ag = 1;
        var bg = 1;
        if(order_by_perGame)
        {
            ag = a.G;
            bg = b.G;
        }

        var mult = -1;
        if(document.getElementById("asc_or_desc").value == 'a')
            mult = 1;

        if(isNaN(a[statOrder]))
            return -1*mult;
        
        if(isNaN(b[statOrder]))
            return mult;

        if(a[statOrder]/ag > b[statOrder]/bg)
            return mult;

        if(a[statOrder]/ag < b[statOrder]/bg)
            return -1*mult;

        return 0;
    }));
}

function get_results()
{
    // var data = get_data() luego se pone
    var stats = parseData(data)
    var filters_input = document.getElementsByClassName("filter-added");
    
    var filters = []
    for(let i = 0; i < filters_input.length; i++)
    {
        var s = filters_input[i].children[0].value;
        var op = filters_input[i].children[1].value;
        var v = filters_input[i].children[2].value;
        if( v != "")
            filters.push(new Filter(s, op, parseFloat(v)));
    }
    var result = research(stats, filters);
    showResult(result, filters)
}

function remove_filter(ev)
{
    if(ev.target.className == "line-remove-filter")
        ev = ev.target.parentNode;
    else
        ev = ev.target;

   var filter = ev.parentNode;
   var container = filter.parentNode;
   container.removeChild(filter.nextSibling)
   container.removeChild(filter)
}

function add_filter_options(select)
{

    var option = document.createElement("option");
    option.value = "G";
    option.innerHTML = "<p>G</p>";
    select.appendChild(option);

    var add_stat = function(stat, select)
    {
        var option = document.createElement("option");
        option.value = stat;
        if(stat[stat.length - 1] != '%')
            option.innerHTML = "<p>" + stat + "/G</p>";
        else
            option.innerHTML = "<p>" + stat + "</p>";

        if(stat[stat.length - 1] != '%')
            option.value += '/G'
        var optionTotals = document.createElement("option");
        optionTotals.value =  stat + ' (Total)';
        optionTotals.innerHTML = "<p>" + optionTotals.value + "</p>";

        select.appendChild(option);
        if(stat[stat.length - 1] != '%')
            select.appendChild(optionTotals);
    };

    add_stat('PTS', select);
    add_stat('REB', select);
    add_stat('AST', select);
    add_stat('OREB', select);
    add_stat('DREB', select);
    add_stat('STL', select);
    add_stat('BLK', select);
    add_stat('FG', select);
    
    add_stat('FGA', select);
    add_stat('FG%', select);
    add_stat('3P', select);
    add_stat('3PA', select);
    add_stat('3P%', select);
    add_stat('eFG%', select);
    add_stat('FT', select);
    add_stat('FT%', select);
    
    add_stat('TS%', select);
    add_stat('TOV', select);
    add_stat('PF', select);
}

function add_filter()
{
    var container = document.querySelector(".filter-item-filter");
    var add_filter_button = document.querySelector(".add-filter")
    var filter = document.createElement("div");
    filter.className = "filter-added";

    filter.innerHTML = '<select><option value="greater_equal"><p>>=</p></option><option value="equal"><p>=</p></option><option value="minor"><p><</p></option></select><input type="number" name="" step="0.1" min="0" class="value-filter-stat"><div class="remove-filter"><div class="line-remove-filter"></div></div>';
   
    var end = document.createElement("div");
    var select = document.createElement("select");
    add_filter_options(select);
    filter.innerHTML = "<select>" + select.innerHTML + "</select>" + filter.innerHTML;
    end.className = "end-filter-stat";

    container.insertBefore(filter, add_filter_button);
    container.insertBefore(end, add_filter_button);
    filter.querySelector(".remove-filter").addEventListener("click", remove_filter , false );
}

function add_seasons_sinceTo_andSelectOrder()
{
    add_filter_options(document.getElementById("order_by"));

    var since = document.getElementById("season-since-filter");
    var to_ = document.getElementById("season-to-filter");
    var cant_temps = 75;
    var current_season = 2022;
    var first_season = 1947

    for(let i = first_season; i <= current_season; i++){
        var i_to = current_season - i + first_season
        var option_since = document.createElement("option");
        var option_to = document.createElement("option")

        option_since.value = i;
        option_to.value = i_to;
        var si = i + "";
        var sito = i_to + "";
        option_since.innerHTML = (i - 1) + "-" + si[2] + si[3];
        option_to.innerHTML =  (i_to - 1) + "-" + sito[2] + sito[3];

        since.appendChild(option_since);
        to_.appendChild(option_to);
    }
}

window.addEventListener('load', add_seasons_sinceTo_andSelectOrder, false)