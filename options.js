

    function hideOptions(e)
    {
        var cName = e.target.className.split(' ');
        if(cName[0] == "line" || cName[0] == "three-lines" || cName[0] == "options-mobile")
            return;
        
        document.querySelector(".options-mobile").classList.remove("options-mobile-on");
        window.removeEventListener("click", hideOptions, false);
    }

    function show_hideOptions(e)
    {
        var optionsMobile = document.querySelector(".options-mobile");

        if(optionsMobile.classList.length > 1)
        {
            optionsMobile.classList.remove("options-mobile-on");
            window.removeEventListener("click", hideOptions, false);
        }


        else
        {
            optionsMobile.classList.add("options-mobile-on");
            window.addEventListener("click", hideOptions, false);
        }

    }

    function start()
    {
        document.querySelector(".three-lines").addEventListener("click", show_hideOptions, false)
        showSeasonLeaders();
    }

    window.addEventListener("load", start, false);
