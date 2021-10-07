function singleSeasonStat(player_name, stat)
{
    this.name = player_name;
    this.stat = stat;
}

function logo(){
    document.getElementById("logo").innerHTML = document.body.clientWidth;
}

function showLeaders()
{
    var seasonStats = data['2021'];
    var ptsLeaders = [];

    Object.keys(seasonStats).forEach(playerID => 
        {
            var playerStats = seasonStats[playerID]
            var name = playerStats['name']
            var team = '';
            if(playerStats['TOT'])
            {
                team = 'TOT'
            }
            else
            {
                team = Object.keys(playerStats)[1];
            }

            var pts = parseFloat(playerStats[team][21]);
            var g = parseFloat(playerStats[team][0]);
            var pts_g = pts/g
            ptsLeaders.push(new singleSeasonStat(name, pts_g))
        });

        var statsToShow = ptsLeaders.sort(function(a, b)
        {
            if (a.stat > b.stat)
                return -1;

            if(a.stat < b.stat)
                return 1;

            return 0;
        }).slice(0, 8);
        
        var content = document.querySelectorAll("#PTS .content-leader");
        for(var i = 0; i < content.length; i++)
        {
            console.log(content[i].childNodes)
            content[i].childNodes[3].innerHTML = statsToShow[i].name;
            content[i].childNodes[5].innerHTML = statsToShow[i].stat.toFixed(1);
        }

}

window.onload = showLeaders;
window.onresize = logo;