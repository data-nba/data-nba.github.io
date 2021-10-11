function Filter(stat, operator, value)
{
    this.stat = stat;
    this.operator = operator;
    this.value = value;
}

function search(data, filter, perGame)
{

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
        option.innerHTML = "<p>" + stat + "/G</p>";

        var optionTotals = document.createElement("option");
        optionTotals.value =  stat + ' (Total)';
        optionTotals.innerHTML = "<p>" + optionTotals.value + "</p>";

        select.appendChild(option);
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
    console.log(parseFloat("") + 5);
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