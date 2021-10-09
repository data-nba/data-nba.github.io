function singleSeasonStat(player_name,g, PTS, REB, AST, STL, BLK, _3P)
{
    this.name = player_name;
    this.PTS = PTS;
    this.REB = REB;
    this.AST = AST;
    this.STL = STL;
    this.BLK = BLK;
    this._3P = _3P;
    this.g = g;
}

var index = {'G':0, '_3P':6, 'REB':15, 'AST':16, 'STL':17, 'BLK':18, 'PTS':21 };

function logo(){
    document.getElementById("logo").innerHTML = document.body.clientWidth;
}

function showInCategoria(stats, stat, totals)
{
    var statsToShow = stats.sort(function(a, b)
        {
            var ag = a.g;
            var bg = b.g;
            if (totals)
            {
                ag = 1;
                bg = 1;
            }

            if (a[stat]/ag > b[stat]/bg)
                return -1;

            if(a[stat]/ag < b[stat]/bg)
                return 1;

            return 0;
        }).slice(0, 8);

        return statsToShow;
}

function showLeaders()
{
    var seasonStats = data['2021'];
    console.log(seasonStats)
    var stats = [];

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
            var reb = parseFloat(playerStats[team][index['REB']])
            var ast = parseFloat(playerStats[team][index['AST']])
            var stl = parseFloat(playerStats[team][index['STL']])
            var blk = parseFloat(playerStats[team][index['BLK']])
            var _3p = parseFloat(playerStats[team][index['_3P']])
            stats.push(new singleSeasonStat(name,g, pts, reb, ast, stl, blk, _3p))
        });

        var content = document.getElementsByClassName("leader");
        
        for(var i = 0; i < content.length; i++)
        {
            var statsToShow = showInCategoria(stats, content[i].id)
            var content_leader = content[i].getElementsByClassName("content-leader");
            for(var j = 0; j < content_leader.length; j++)
            {
                var children = content_leader[j].childNodes;
                children[3].innerHTML = statsToShow[j].name;
                children[5].innerHTML = (statsToShow[j][content[i].id]/statsToShow[j].g).toFixed(1);
            }
        }

}

window.onload = showLeaders;
window.onresize = logo;