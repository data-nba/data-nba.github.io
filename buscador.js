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

function add_filter()
{
    var container = document.querySelector(".filter-item-filter");
    var add_filter_button = document.querySelector(".add-filter")
    var filter = document.createElement("div");
    filter.className = "filter-added";

    filter.innerHTML = '<select name="" id="stat-filter-added"><option value=""><p>PTS</p></option><option value=""><p>REB</p></option><option value=""><p>AST</p></option></select><select name="" id="less-equal-greater"><option value=""><p>>=</p></option><option value=""><p>=</p></option><option value=""><p><</p></option></select><input type="number" name="" step="0.1" min="0" class="value-filter-stat"><div class="remove-filter"><div class="line-remove-filter"></div></div>';
    
    var end = document.createElement("div");

    end.className = "end-filter-stat";

    container.insertBefore(filter, add_filter_button);
    container.insertBefore(end, add_filter_button);
    filter.querySelector(".remove-filter").addEventListener("click", remove_filter , false );
}